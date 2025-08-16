# Meeting Summarizer

# 1. Problem Statement

Taking meeting transcripts and converting them into concise, structured summaries is often tedious and time-consuming. Additionally, sharing these summaries with multiple stakeholders through email requires extra effort.
Goal: Build a lightweight web app that:
Accepts meeting transcripts.
Generates an AI-based summary.
Allows sharing the summary via email in one click.

# 2. Tech Stack-

Backend- Node.js+ Express

Frontend- React+ Tailwind

Deployment- Render

Email Service- Resend.

AI Model- Groq

# 3. Approach
A)  Backend (Node.js + Express):

  Built a REST API with two main endpoints:
  
  /summarize → accepts transcript and generates summary using Groq LLM.  

  /share → accepts summary + recipient(s) email(s) and sends via Resend email API.    
  
  Added error handling for missing fields and server failures.    
  
Used CORS to allow frontend integration.    

B)  Frontend (React + Tailwind):

Simple interface with:

Input box for transcript.

Button to generate summary.

Textbox for recipient emails.

Share button to send the summary.

Used fetch() to call backend APIs.

C)  Email Delivery:

 Used Resend API for reliable email sending without managing SMTP credentials.

 Emails include both plain text and HTML version of the summary.

# 5. Process Flow



A)  User pastes transcript into the app.

B)  App calls Groq API → gets structured summary.

C)  User enters recipient email(s).

D)  App calls backend /share → backend sends summary via Resend email API.

E)  Recipient receives email with subject “Meeting Summary”.
