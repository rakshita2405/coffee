// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const { getBotResponse } = require('../Controllers/chabootCon');

// POST route to interact with the chatbot
router.post('/chatbot', async (req, res) => {
  const userMessage = req.body.message;
  const botResponse = await getBotResponse(userMessage);
  
  res.json({ response: botResponse });
});

module.exports = router;

