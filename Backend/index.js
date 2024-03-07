const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
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


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const port = process.env.PORT || 3001;


app.post('/contact-form', upload.single('file'), (req, res) => {
  const formData = req.body;
  const file = req.file; 

  const mailOptions = {
    from: 'asadishaq013@gmail.com',
    to: 'asadishaq392@gmail.com',
    subject: 'Contact Us Form Submission',
    html: `
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Phone: ${formData.phone}</p>
      <p>Company: ${formData.company}</p>
      <p>Department: ${formData.department}</p>
      <p>Message: ${formData.message}</p>
    `,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending contact form data:', error);
      res.status(500).json({ status: 'error' });
    } else {
      console.log('Contact form data sent successfully:', formData);
      res.status(200).json({ status: 'success' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
