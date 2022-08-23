const nodemailer = require("nodemailer");

const sendEmail = (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: "25",
      auth: {
        // Sender detail   
        user: "portiondoc77@gmail.com",
        pass: "eeewhwdbcxaqafhz",
      },
    });

    const mailOptions = {
      from: "portiondoc77@gmail.com",
      to: email, // Email of the user (receiver)
      subject: "User Verification OTP Code",
      text: "Your user verification code for PortionDoc is " + text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully: " + info.response);
      }
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
