var nodemailer = require("nodemailer");

module.exports = function sendMail(html, res){
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });
  var mailOptions = {
      from: process.env.STUDENT_EMAIL,
      subject: 'Question from Student',
      to: process.env.EMAIL,
      html: html
  };
  transporter.sendMail(mailOptions, function(mailError, mailInfo){
      if(mailError){
          throw new Error(mailError);
      }
      res.json({success: true, message: 'record added'})
  });
}
