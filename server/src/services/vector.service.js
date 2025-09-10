const {Pinecone} = require('@pinecone-database/pinecone')

const pc = new Pinecone({ apiKey: process.env.PINECON_API });

const codingMateIndex = pc.Index('codingmate')

//creating database for vecotrs
const createMemory = async function({messageId,vectors,metadata}) {
     await codingMateIndex.upsert([{
        id:messageId,
        values:vectors,
        metadata    
     }])
}

//RAG
const searchMemory = async function ({queryvector,limit=5,metadata}) {
   const data =    await codingMateIndex.query({
        vector:queryvector,
        topK : limit,
        filter:metadata||undefined,
        includeMetadata:true
      })
      return data.matches 
}

module.exports = {
   createMemory,
   searchMemory
}