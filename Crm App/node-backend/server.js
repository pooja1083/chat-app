const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { 
  createDb, 
  createTable, 
  insertUser, 
  insertConversation, 
  insertAnswers, 
  insertMessage, 
  getMessagesByConversation, 
  getAnswers 
} = require("./db");
const { 
  updateTimeController, 
  getConversationById, 
  insertMessageController, 
  getMessagesByConversationController 
} = require("./controller/apiController");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const initialSetup = async () => {
  try {
    await createDb("chat_app");
    await createTable();

    // Adding static user
    await insertUser("12345", "John", "Doe", "john.doe@example.com");

    // Adding case details
    const now = new Date();
    const currentDate = now.toISOString();
    await insertConversation(
      "12345",
      "54321",
      "C102345",
      "P54321",
      "Widget Pro",
      currentDate,
      currentDate,
      "Active"
    );

    // Adding predefined answers
    const answers = [
      "Hello John, have you tried checking the memory allocated for your site?",
      "Thanks for confirming. Can you please check if there are any error messages in your browser console?",
      "Alright. Let's try resetting the Widget Pro. Can you please go to the plugin settings and click on 'Reset to Default'?"
    ];

    const predefinedAnswersData = await getAnswers();

    if (predefinedAnswersData.length === 0) {
      for (const answer of answers) {
        await insertAnswers(answer);
      }
    }

    // Adding initial message
    const messages = await getMessagesByConversation("54321");
    if (messages.length === 0) {
      await insertMessage("12345", "54321", "out", "Hey, How may I help you?", currentDate);
      console.log("Initial Hello Message from chat-bot inserted");
    }
  } catch (error) {
    console.error("Error in initial setup:", error);
  }
};

initialSetup();

app.post("/api/updateTime", async (req, res) => {
  const response = await updateTimeController(req, res);
  res.json(response);
});

app.get("/api/getConversation", async (req, res) => {
  const response = await getConversationById(req, res);
  res.json(response);
});

app.post("/api/message", async (req, res) => {
  const response = await insertMessageController(req, res);
  res.json(response);
});

app.get("/api/message", async (req, res) => {
  const response = await getMessagesByConversationController(req, res);
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
