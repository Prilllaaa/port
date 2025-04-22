const { MongoClient } = require("mongodb");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  try {
    // Store message in MongoDB
    await client.connect();
    const db = client.db("messages");
    const collection = db.collection("contacts");
    await collection.insertOne({ name, email, message, date: new Date() });

    // Send email using Resend
    await resend.emails.send({
      from: "Luxe and Love <onboarding@resend.dev>",
      to: process.env.EMAIL,
      subject: `New message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    });

    res.status(200).send("Message sent and saved!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Something went wrong");
  } finally {
    await client.close();
  }
};

