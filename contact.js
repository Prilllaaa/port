const mongoose = require("mongoose");
const Message = require("../models/Message");
const dbConnect = require("../utils/db");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  await dbConnect();

  const { name, email, message } = req.body;

  const newMessage = new Message({ name, email, message });
  await newMessage.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `New message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent and saved!");
  } catch (error) {
    res.status(500).send("Error sending message");
  }
};