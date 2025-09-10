const { Server, Socket } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const userModel = require("../model/user.model");
const aiService = require("../services/ai.service");

const messageModel = require("../model/message.model");
const vectorService = require("../services/vector.service");
const {
  context,
} = require("@pinecone-database/pinecone/dist/assistant/data/context");
const { meta } = require("../middleware/email.config");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    /* options */
  });

  //middleware
  io.use(async (socket, next) => {
    const cookies = socket.handshake.headers.cookie
      ? cookie.parse(socket.handshake.headers.cookie)
      : {};

    if (!cookies.token) {
      return next(new Error("unauthorized user"));
    }
    try {
      const decode = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decode.id);

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("unauthorized user"));
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("user-message", async (messagepayload) => {
      console.log(messagepayload);
      //usermessage and usercontent generate vectors
      const [userMessageData, vectors] = await Promise.all([
        await messageModel.create({
          user: socket.user._id,
          chat: messagepayload.chat,
          content: messagepayload.content,
          role: "user",
        }),
        await aiService.genrateVectors (messagepayload.content),
      ]);
      //vectors save in pineconDB
      await vectorService.createMemory({
        messageId: userMessageData._id,
        vectors,
        metadata: {
          user: socket.user._id,
          chat: messagepayload.chat,
          content: messagepayload.content,
        },
      });
      //RAG implement
      const memory = await vectorService.searchMemory({
        queryvector: vectors,
        limit: 5,
        metadata: {
          user: socket.user._id,
        },
      });
      
      //chatHistory with mongoDB
      const chatHistory = (
        await messageModel
          .find({ chat: messagepayload.chat })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
      ).reverse();
      //stm
      const stm = chatHistory.slice(-5).map((item) => {
        return { role: item.role, parts: [{ text: item.content }] };
      });
      //ltm
      const ltm = [
        {
          role: "user",
          parts: [
            {
              text: `these are some previous messages from the chat, use them to generate a responsez
            ${memory.map((item) => item.metadata.content).join("\n")}
            `,
            },
          ],
        },
      ];
      
      
      const response = await aiService.genrateResponse([...ltm,...stm]);

      socket.emit("ai-response", {
        content: response,
        chat: messagepayload.chat,
      });
      //airesponse save in mongo
      const aiResponseData = await messageModel.create({
        user: socket.user._id,
        chat: messagepayload.chat,
        content: response,
        role: "model",
      });
      //genrate ai vectors
      const aivectors = await aiService.genrateVectors (response);
      //ai vectors save in pinecon
      await vectorService.createMemory({
        messageId: aiResponseData._id,
        vectors: aivectors,
        metadata: {
          user: socket.user._id,
          chat: messagepayload.chat,
          content: response,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("disconnect the user");
    });
  });
}

module.exports = initSocketServer;
