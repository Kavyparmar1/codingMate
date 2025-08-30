const transporter = require("./email.config.js");
const { Verification_Email_Template } = require("./emailtemplate.js");

//send  mail 
 const sendEmail = async (email,verificationtoken)=>{
   try {
            const response = await transporter.sendMail({
    from: '"from codingMATE" <kavyparmar2005@gmail.com>',
    to: email,
    subject: "verify your Email",
    text: "verify your Email", // plain‑text body
    html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    <h2 style="color: #4CAF50;">Verify Your Email 🚀</h2>
    <p>Hi there,</p>
    <p>Use the following code to verify your email address:</p>

    <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; 
                background: #f4f4f4; padding: 10px; border-radius: 6px; 
                text-align: center; color: #222; border: 1px solid #ddd; margin: 20px 0;">
      ${verificationtoken}
    </div>

    <p>This code will expire in <b>10 minutes</b>. If you did not request this, you can safely ignore this email.</p>
    <p style="margin-top:20px;">Cheers,<br/>The CodingMATE Team</p>
  </div>
`
      , // HTML body
  });
  console.log("send mail" , response);
  
   } catch (error) {
       log("email not send",error);
   }
}

//welcone mail
 const welcomeEmail = async (email,username)=>{
   try {
            const response = await transporter.sendMail({
    from: '"from codingMATE" <kavyparmar2005@gmail.com>',
    to: email,
    subject: `welcome ${username}`,
    text: `welcome ${username}`, // plain‑text body
    html: `
  <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <h2 style="color: #4CAF50; text-align: center; margin-bottom: 10px;">
        Welcome to CodingMATE 🚀
      </h2>
      <p style="text-align: center; font-size: 18px; color: #555; margin-bottom: 30px;">
        Hi <b>${username}</b>, we’re excited to have you onboard!
      </p>

      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        At <b>CodingMATE</b>, our mission is simple — to help you 
        <span style="color:#4CAF50; font-weight:bold;">boost productivity</span> and 
        make your development journey smoother. 🎯  
      </p>

      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        You now have access to a suite of tools that will save you time, 
        organize your workflow, and keep you ahead in your projects. 
        Let’s make things happen!
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <h1
           style="background: #4CAF50; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 8px; font-weight: bold; 
                  font-size: 16px; display: inline-block;">
          Welcome, ${username} Every small step you take today brings you closer to the success you dream of tomorrow.”
        </h1>
      </div>

      <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
        Let’s build something amazing together 💡<br>
        — The CodingMATE Team
      </p>

    </div>
  </div>
`

      , // HTML body
  });
  console.log("send mail" , response);
  
   } catch (error) {
       log("email not send",error);
   }
}
module.exports = { sendEmail , welcomeEmail}