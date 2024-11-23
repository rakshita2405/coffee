// controllers/chatbotController.js
const getBotResponse = async (message) => {
  let botResponse = "Sorry, I didn't understand that.";

  // Add your chatbot logic here (could be more complex if needed)
  message = message.toLowerCase();

  if (message.includes("menu")) {
    botResponse = "Our menu includes Espresso, Latte, Cappuccino, and Mocha. What would you like to order?";
  } else if (message.includes("order")) {
    botResponse = "Please choose your coffee and I'll guide you through the order process!";
  } else if (message.includes("help")) {
    botResponse = "I can help you with our menu or assist you with placing an order. Just let me know!";
  }

  return botResponse;
};

module.exports = { getBotResponse };

  