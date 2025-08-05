import React, { useState } from "react";
import styles from "./TextArea.module.css";
import { Button } from "@mui/material";

const TextArea = ({ sendMessage }) => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["text-area-head"]}></div>
      <textarea
        type="text"
        className={styles["text-field"]}
        value={text}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#05047E",
          "&:hover": { backgroundColor: "#05047E" },
          textTransform: "none",
          fontSize: "0.7rem",
          borderRadius: "0rem"
        }}
        className={styles["btn"]}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </div>
  );
};

export default TextArea;
