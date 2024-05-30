// index.js

require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = 3000;

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: openaiApiKey });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a proficient full-stack developer specializing in JavaScript and NodeJS. Your code is production-ready and tailored to real-life scenarios. You also excel in blockchain development, especially on EVM. Simply heed user inputs and deliver effective solutions.'
        },
        { role: 'user', content: message }
      ],
      model: 'gpt-4o',
      response_format: { type: 'text' } // Set response format to plaintext
    });
    const responseData = completion.choices[0].message.content;
    res.send(responseData); // Send response as plaintext
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing your request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
