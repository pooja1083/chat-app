import React, { useEffect, useRef } from "react";
import styles from "./Conversation.module.css";
import userIcon from "../svg/user-icon.svg";
import supportIcon from "../svg/support-icon.svg";
import seenIcon from "../svg/seen.svg";

const Conversation = ({ messages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "2-digit", 
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Determine additional class based on messages length
  const containerClass = messages.length === 1 
    ? `${styles.container} ${styles['supportText-empty']}` 
    : styles.container;

  return (
    <div className={containerClass} ref={containerRef}>
      {messages?.map((message, index) => (
        <div
          key={index}
          className={
            message?.direction === "in"
              ? styles["user-container"]
              : styles["response-container"]
          }
        >
          {message?.direction === "in" ? (
            <>
              <img src={userIcon} alt="User Icon" />
              <div className={styles["userText-container"]}>
                <div className={styles["userText"]}>
                  {message && message?.content
                    ? message?.content
                    : "User's Message"}
                </div>
                <div className={styles["userText-time"]}>
                  Chat - {formatTimestamp(message?.timestamp)}
                  <img src={seenIcon} alt="seen Icon" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles["supportText-container"]}>
                <div className={styles["supportText"]}>
                  {message && message?.content
                    ? message?.content
                    : "This is an automated bot response."}
                </div>
                <div className={styles["supportText-time"]}>
                  Chat - {formatTimestamp(message?.timestamp)}
                  <img src={seenIcon} alt="seen Icon" />
                </div>
              </div>
              <img src={supportIcon} alt="Support Icon" />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
