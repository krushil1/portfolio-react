import React from "react";

const Chat: React.FC = () => {
  return (
    <div style={{ height: "800px" }}>
      <iframe
        src="https://calendly.com/krushilamrutiya/15-mins"
        width="100%"
        height="100%"
        frameBorder="0"
        title="Schedule a chat"
      ></iframe>
    </div>
  );
};

export default Chat;
