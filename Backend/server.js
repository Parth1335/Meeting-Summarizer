import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Groq from 'groq-sdk';
import { Resend } from 'resend';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 3001;

app.post("/generate",async(req,res)=>{
    try{
        const{transcript, prompt}=req.body;

        const completion = await groq.chat.completions.create({
            model : "llama-3.3-70b-versatile",
            messages: [
        { role: "system", content: "You are a meeting summarizer." },
                
        {
          role: "user",

          content: `Summarize the transcript as per instruction:\nInstruction: ${prompt}\nTranscript:\n${transcript}`
        },

      ],

      temperature: 0.3,
      max_tokens:800,
        })

        const summary = completion.choices[0]?.message?.content || "No Summary Generated.";
        res.json({summary});
    }catch(error){
        console.error(error.message);
        res.status(500).json({error: "Failed to Generate summary"})
    }
});

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.post("/share", async (req, res) => {
  try {
    const { email, summary} = req.body;

       if (!email || !summary) {
      return res.status(400).json({ error: "Email and summary are required" });
    }


    const info = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Meeting Summary",
      text: summary,
      html: `<pre>${summary}</pre>`,
    });

    res.json({ message: "Email sent", info });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
