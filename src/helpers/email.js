const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

exports.sendEmail = (email, text) =>{
  console.log(text)
  return new Promise((resolve, reject)=>{
    const message = {
      from: process.env.EMAIL, 
      to: email, 
      subject: "example email", 
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
        .wrapper{
          height: 200px;
          width: 300px;
          background-color: rgb(0, 89, 255);
          margin: auto;
        }
        h2{
          text-align: center;
        }
        .wrapper h3{
          color: rgb(250, 248, 248);
          text-align: center;
        }
      </style>
      </head>
      <body>
      <h2>Silahkan Veifikasi email anda disini</h2>
        <div class="wrapper">
          <h3>${text}</h3>
        </div>
      <h3>Terimakasih <br>regards, <br><br>Developer Zwallet </h3>
      </body>
      </html>`, 
    }
    transporter.sendMail(message, (error, info) => {

      if (error) {
        // console.log('Error occurred');
        // console.log(error.message);
        // return process.exit(1);
        console.log(error)
        reject(error)
      }else{
        resolve(info)
      }
      });
  })

}