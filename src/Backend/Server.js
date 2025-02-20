const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

const users = {};
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // Replace with your Gmail
    pass: "your-email-password", // Replace with your Gmail password
  },
});

// Handle preflight OPTIONS requests
app.options("*", cors()); // Enable preflight for all routes

app.post("/register", (req, res) => {
  const { name, age, phone, gmail, password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  users[gmail] = { name, age, phone, password };
  otpStore[gmail] = otp;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: gmail,
    subject: "OTP for Registration",
    text: `Your OTP for registration is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json({ success: false });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
});

app.post("/verify-otp", (req, res) => {
  const { gmail, otp } = req.body;
  if (otpStore[gmail] === otp) {
    delete otpStore[gmail];
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});