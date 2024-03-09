const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Added for path manipulation
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const port = process.env.PORT || 3001;

// Endpoint for handling contact form submissions
app.post('/contact-form', (req, res) => {
  const formData = req.body;
  const fs = require('fs');
  const template = fs.readFileSync('contact-form.html', 'utf8');

  const formattedEmail = template
    .replace('{{name}}', formData.name)
    .replace('{{email}}', formData.email)
    .replace('{{phone}}', formData.phone)
    .replace('{{company}}', formData.company)
    .replace('{{department}}', formData.department)
    .replace('{{message}}', formData.message)
    ;

  const mailOptions = {
    from: 'asadishaq013@gmail.com',
    to: 'asadishaq392@gmail.com', // Replace with the contact form recipient's email address
    subject: 'Contact Us Form Submission',
    html: formattedEmail,
  };

  try {
    transporter.sendMail(mailOptions);
    console.log('Contact form data sent successfully:', formData);
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error sending contact form data:', error);
    res.status(500).json({ status: 'error' });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${port}`);
});
