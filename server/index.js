const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
	key: process.env.OPENAI_API_KEY,
});

const systemPrompt = process.env.chatText;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});

app.post('/chat', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: `${req.body.country} - ${req.body.city}-${req.body.days}-${req.body.purpose}-${req.body.kids}`
                }
            ],
        });
        console.log("burası",completion.choices[0].message.content);
   
        
        res.send(completion.choices[0].message.content);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
