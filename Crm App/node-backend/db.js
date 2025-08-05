const { Pool } = require("pg");
const { config } = require("./config");

const adminPool = new Pool({
  user: config.user,
  host: "localhost",
  database: "postgres",
  password: config.dbPassword,
  port: config.port,
  max: 20
});

const getPool = (dbName) => {
  const pool = new Pool({
    user: config.user,
    host: "localhost",
    database: dbName,
    password: config.dbPassword,
    port: config.port,
    max: 20
  });

  return pool;
};

const createDb = async (dbName) => {
  const createDatabaseQuery = `CREATE DATABASE ${dbName}`;
  const client = await adminPool.connect();
  try {
    // Create the database if it doesn't exist
    const data = await client.query(createDatabaseQuery);
    console.log(data);
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    client.release();
  }
};

const createTable = async () => {
  const pool = getPool("chat_app");
  const client = await pool.connect();

  const createMessageTableQuery = `
    CREATE TABLE IF NOT EXISTS message (
      messageid SERIAL PRIMARY KEY,
      userid VARCHAR(255),
      conversationid VARCHAR(255),
      direction VARCHAR(255),
      content TEXT,
      timestamp VARCHAR(255)
    )
  `;

  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      email VARCHAR(255)
    )
  `;

  const createConversationTableQuery = `
    CREATE TABLE IF NOT EXISTS conversation (
      conversationId VARCHAR(255) PRIMARY KEY,
      userId VARCHAR(255),
      caseId VARCHAR(255),
      productId VARCHAR(255),
      productName VARCHAR(255),
      createdAt VARCHAR(255),
      lastUpdated VARCHAR(255),
      status VARCHAR(255)
    )
  `;

  const createResponseTable = `
    CREATE TABLE IF NOT EXISTS answers (
      id SERIAL PRIMARY KEY,
      content TEXT
    )
  `;

  try {
    // Create the database if it doesn't exist
    await client.query(createMessageTableQuery);
    await client.query(createUserTableQuery);
    await client.query(createConversationTableQuery);
    await client.query(createResponseTable);
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    client.release();
  }
};

const insertUser = async (userId, firstName, lastName, email) => {
  const insertQuery = `
    INSERT INTO users (userid, firstname, lastname, email)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [userId, firstName, lastName, email];

  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    await client.query(insertQuery, values);
    console.log("User inserted successfully");
  } catch (error) {
    console.error("Error inserting message:", error);
  } finally {
    client.release();
  }
};

const insertConversation = async (
  userId,
  conversationId,
  caseId,
  productId,
  productName,
  createdAt,
  lastUpdated,
  status
) => {
  const insertQuery = `
    INSERT INTO conversation (userid, conversationid, caseid, productid, productname, createdat, lastupdated, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  const values = [
    userId,
    conversationId,
    caseId,
    productId,
    productName,
    createdAt,
    lastUpdated,
    status,
  ];

  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    await client.query(insertQuery, values);
    console.log("Conversation inserted successfully");
  } catch (error) {
    console.error("Error inserting message:", error);
  } finally {
    client.release();
  }
};

const insertMessage = async (
  userId,
  conversationId,
  direction,
  content,
  timestamp
) => {
  const insertQuery = `
    INSERT INTO message (userid, conversationid, direction, content, timestamp)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [
    userId,
    conversationId,
    direction,
    content,
    timestamp,
  ];

  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    await client.query(insertQuery, values);
    console.log("Message inserted successfully");
  } catch (error) {
    console.error("Error inserting message:", error);
    throw new Error(error);
  } finally {
    client.release();
  }
};

const insertAnswers = async (predefinedAnswers)=> {
  const insertQuery = `
    INSERT INTO answers (content)
    VALUES ($1)
  `;
  const values = [predefinedAnswers];
  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    await client.query(insertQuery, values);
    console.log("Answers inserted successfully");
  } catch (error) {
    console.error("Error inserting message:", error);
  } finally {
    client.release();
  }
}

const updateTimeConversation = async (date, conversationId) => {
  const updateQuery = `
    UPDATE conversation
    SET lastupdated = $1
    WHERE conversationid = $2
  `;
  const values = [date, conversationId];

  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    await client.query(updateQuery, values);
    console.log("conversation time updated successfully");
  } catch (error) {
    console.error("Error inserting message:", error);
  } finally {
    client.release();
  }
};

const getConversationDataById = async (userid) => {
  const updateQuery = `
    SELECT * FROM conversation
    WHERE userid = $1
  `;
  const values = [userid];

  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    const queryResult = await client.query(updateQuery, values);
    console.log(queryResult.rows);
    console.log("conversation data fetched successfully");
    return queryResult.rows;
  } catch (error) {
    console.error("Error inserting message:", error);
    throw new Error("error in getting data from conversation table");
  } finally {
    client.release();
  }
}

const getMessagesByConversation = async (conversationId) => {
  const getDataQuery = `
    SELECT * FROM message
    WHERE conversationid = $1
    ORDER BY timestamp ASC;
  `;

  const values = [conversationId];

  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    const queryResult = await client.query(getDataQuery, values);
    console.log(queryResult.rows, 'messages');
    console.log("fetched messages");
    return queryResult.rows;
  } catch (error) {
    console.error("Error inserting message:", error);
    throw new Error("error in getting data from conversation table");
  } finally {
    client.release();
  }
}

const getAnswers = async () => {
  const getDataQuery = `SELECT * FROM answers`;

  const pool = getPool("chat_app");
  const client = await pool.connect();
  try {
    const queryResult = await client.query(getDataQuery);
    console.log(queryResult.rows);
    console.log("Fetched Predefined Answers...");
    return queryResult.rows;
  } catch (error) {
    console.error("Error inserting message:", error);
    throw new Error("error in getting data from conversation table");
  } finally {
    client.release();
  }
}

module.exports = { createDb, createTable, insertMessage, insertUser, insertConversation, insertAnswers, updateTimeConversation, getConversationDataById, getMessagesByConversation, getAnswers};
