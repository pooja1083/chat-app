import React, { useEffect, useState } from 'react';
import styles from './ChatPage.module.css';
import Info from '../components/Info';
import Conversation from '../components/Conversation';
import TextArea from '../components/TextArea';
import axios from 'axios';
import { data } from "../config";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


const ChatPage = () => {
  const userId = '12345';
  const [conversationData, setConversationData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const sendMessage = async (text) => {
    try {
      const payload = {
        userId: conversationData.userid,
        conversationId: conversationData.conversationid,
        direction: "in",
        content: text
      };

      const apiResponse = await axios.post(`http://${data.endpoint}/api/message`, payload);
      const newMessage = apiResponse.data.data;

      const latestTimestamp = newMessage[0].timestamp;

      // Update messages state with the new message
      setMessages((prevMessages) => [...prevMessages, newMessage[0]]);
      
      // Update lastUpdated state
      setLastUpdated(latestTimestamp);

      // After 1 second, add the bot's response to the messages state
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, newMessage[1]]);
        setLastUpdated(newMessage[1].timestamp); // Update lastUpdated with bot's response timestamp
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const fetchInfo = async () => {
        const params = { userid: userId };
        const info = await axios.get(`http://${data.endpoint}/api/getConversation`, { params });
        const convData = info?.data?.data ? info?.data?.data[0] : null;
        setConversationData(convData);
  
        if (convData?.conversationid) {
          const messageParams = { conversationid: convData.conversationid };
          const messageResponse = await axios.get(`http://${data.endpoint}/api/message`, { params: messageParams });
          const messages = messageResponse?.data?.data;
          setMessages(messages);

          // Set lastUpdated to the timestamp of the latest message
          if (messages && messages.length > 0) {
            setLastUpdated(messages[messages.length - 1].timestamp);
          }
        }
      };
      fetchInfo();
    } catch (err) {
      console.log(err);
    }   
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['chat-container-header']}>
        <KeyboardArrowLeftIcon /> Back to Conversations
      </div>
      <div className={styles['chat-container']}>
        <div className={styles['cancel-text']}>
          I want to cancel my subscription
        </div>

        <Info data={conversationData} lastUpdated={lastUpdated} />
        <Conversation messages={messages} />
        <TextArea sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
