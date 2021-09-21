require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/',(req,res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: req.body.subject,
    text: req.body.message + '\n\n from: ' + req.body.fName + '<' + req.body.email + '>'
  }

  transporter.sendMail(mailOptions, (error,info) => {
    if(error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  })

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})