const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
require("dotenv").config();
const { OpenAI } = require("openai");
const  passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passportSetup");
const authRoute = require("./routes/auth");

const openai = new OpenAI({
	key: process.env.OPENAI_API_KEY,
});

const systemPrompt = process.env.chatText;

app.use(cors());

app.use(express.json());

app.use(cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello, World!");
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
        let advices = completion.choices[0].message.content;
        advices = JSON.parse(advices);
        console.log(advices.info);
        res.send(advices);
        console.log(advices);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.get('/chat', (req, res) => {
    const country = req.query.country;
    const city = req.query.city;
    const days = req.query.days;
    const purpose = req.query.purpose;
    const kids = req.query.kids;

    console.log("Received data:");
    console.log("Country:", country);
    console.log("City:", city);
    console.log("Days:", days);
    console.log("Purpose:", purpose);
    console.log("Kids:", kids);

    
    res.send("Received data successfully");
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});