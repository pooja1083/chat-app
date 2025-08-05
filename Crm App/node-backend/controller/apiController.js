const {
  updateTimeConversation,
  getConversationDataById,
  insertMessage,
  getMessagesByConversation,
  getAnswers,
} = require("../db");

const updateTimeController = async (req, res) => {
  try {
    const { conversationID } = req.body;
    const now = new Date();
    const currentDate = now.toISOString();
    await updateTimeConversation(currentDate, conversationID);
    return {
      message: "successfully updated date and time!",
      status: true,
    };
  } catch (err) {
    return {
      message: "api call failed!",
      status: false,
    };
  }
};

const getConversationById = async (req, res) => {
  try {
    const { userid } = req.query;
    const response = await getConversationDataById(userid);
    return {
      data: response,
      status: true,
      message: "api call success",
    };
  } catch (err) {
    return {
      message: "api call failed!",
      status: false,
    };
  }
};

const insertMessageController = async (req, res) => {
  try {
    let responseData = [];
    const { userId, conversationId, direction, content } = req.body;
    const now = new Date().toISOString();

    // User's message stored
    await insertMessage(userId, conversationId, direction, content, now);
    responseData.push({
      userId,
      conversationId,
      direction,
      content,
      timestamp: now,
    });

    // Fetch predefined answers
    const predefinedAnswers = await getAnswers();
    if (predefinedAnswers.length === 0) {
      throw new Error("No predefined answers found.");
    }

    // Select a random predefined answer
    const randomIndex = Math.floor(Math.random() * predefinedAnswers.length);
    const predefinedContent = predefinedAnswers[randomIndex]?.content;

    if (!predefinedContent) {
      throw new Error("Failed to retrieve predefined content.");
    }

    // Insert bot's message
    const botTimestamp = new Date().toISOString();
    await insertMessage(
      userId,
      conversationId,
      "out",
      predefinedContent,
      botTimestamp
    );
    await updateTimeConversation(botTimestamp, conversationId);

    responseData.push({
      userId,
      conversationId,
      direction: "out",
      content: predefinedContent,
      timestamp: botTimestamp,
    });

    return { status: true, data: responseData };
  } catch (err) {
    console.error("Error in insertMessageController:", err);
    return res.json({ status: false, message: "Error in insertMessageController" });
  }
};

const getMessagesByConversationController = async (req, res) => {
  try {
    const { conversationid } = req.query;
    const response = await getMessagesByConversation(conversationid);
    console.log(response);
    return {
      status: true,
      data: response,
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      data: {},
    };
  }
};

module.exports = {
  updateTimeController,
  getConversationById,
  insertMessageController,
  getMessagesByConversationController,
};
