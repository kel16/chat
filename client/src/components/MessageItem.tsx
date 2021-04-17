import React from "react";
import { getTime } from "utils/date";
import { MessageProps } from "~/types";
import { Message } from "./styles";

const MessageItem = ({ text, date }: MessageProps) => {
  return (
    <Message variant="primary">
      <p className="text">{text}</p>
      <p className="time">{getTime(date)}</p>
    </Message>
  );
};

export default MessageItem;
