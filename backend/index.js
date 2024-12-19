// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

app.post('/api/chat', async (req, res) => {
    try {
        const API_KEY = process.env.OPENAI_API_KEY;
        const API_URL = 'https://api.openai.com/v1/chat/completions';

        console.log('Received request:', req.body); // Debug log

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: req.body.messages
            })
        });

        const data = await response.json();
        console.log('OpenAI response:', data); // Debug log
        res.json(data);
    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});