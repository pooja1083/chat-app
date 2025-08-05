# Chat Application

## Overview

This is a real-time chat application with a customer support interface. The application features a chat bot that can handle customer inquiries and provide automated responses. The front-end is built using React with Material-UI components, while the back-end is developed using Node.js with a PostgreSQL database.

## Project Structure

```
chat-app/
├── Crm App/
│   ├── crm-front-end/          # React frontend application
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   ├── layout/         # Layout components
│   │   │   ├── pages/          # Page components
│   │   │   ├── svg/           # SVG assets
│   │   │   ├── config.js      # API configuration
│   │   │   └── App.js         # Main App component
│   │   └── package.json
│   └── node-backend/           # Node.js backend application
│       ├── controller/         # API controllers
│       ├── config.js          # Database configuration
│       ├── db.js              # Database operations
│       ├── server.js          # Express server
│       └── package.json
└── README.md
```

## Features

- **Real-time Chat Interface**: Customer support chat with automated bot responses
- **Conversation Management**: Track conversations with unique IDs and timestamps
- **User Information Display**: Show customer details and conversation status
- **Message History**: Persistent message storage and retrieval
- **Automated Responses**: Pre-configured bot responses for common inquiries
- **Modern UI**: Clean, responsive interface built with Material-UI

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v16 or higher) installed on your machine
- **PostgreSQL** installed and running
- **npm** or **yarn** package manager

## Setup Instructions

### 1. Database Setup

1. **Install PostgreSQL** if not already installed
2. **Create Database**:
   ```bash
   createdb chat_app
   ```
   This creates the required database for the application.
3. **Configure Database**:
   - Open `Crm App/node-backend/config.js`
   - Update the database configuration:
     ```javascript
     const config = {
       port: 5432,           // PostgreSQL port
       dbPassword: "",       // Your PostgreSQL password
       user: "postgres",     // Your PostgreSQL username
     };
     ```

### 2. Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd "Crm App/node-backend"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the backend server**:
   ```bash
   node server.js
   ```

   The backend server will:
   - Connect to PostgreSQL database
   - Create the `chat_app` database if it doesn't exist
   - Create necessary tables (users, conversations, messages, answers)
   - Insert initial data (sample user, conversation, and bot responses)
   - Start the server on port `3001`

### 3. Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd "Crm App/crm-front-end"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend server**:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` by default.

## API Endpoints

The backend provides the following REST API endpoints:

- `POST /api/updateTime` - Update conversation timestamp
- `GET /api/getConversation` - Retrieve conversation details
- `POST /api/message` - Send a new message
- `GET /api/message` - Retrieve messages for a conversation

## Application Flow

1. **Initial Load**: The application loads with a sample conversation for user "John Doe"
2. **Chat Interface**: Users can send messages through the text area
3. **Bot Responses**: The system automatically responds with pre-configured answers
4. **Message History**: All messages are stored and displayed in chronological order
5. **Real-time Updates**: The interface updates in real-time as messages are sent/received

## Technology Stack

### Frontend
- **React** 
- **Material-UI** 
- **Axios**
- **CSS Modules** 

### Backend
- **Node.js**
- **Express**
- **PostgreSQL**
- **pg**
- **CORS**

## Database Schema

The application uses the following database structure:

- **users**: Store user information (ID, name, email)
- **conversations**: Track conversation details (case ID, product, status)
- **messages**: Store individual messages with timestamps
- **answers**: Pre-configured bot responses

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure PostgreSQL is running
   - Verify database credentials in `config.js`
   - Check if the database port is correct

2. **Frontend Can't Connect to Backend**:
   - Ensure backend is running on port 3001
   - Check if the endpoint in `src/config.js` matches your backend URL

3. **Port Already in Use**:
   - Change the port in `server.js` (backend) or use a different port for frontend
   - Update the corresponding configuration files

### Development Tips

- The backend automatically creates sample data on first run
- Check the browser console for any JavaScript errors
- Monitor the backend console for API request logs
- Use browser developer tools to inspect network requests
