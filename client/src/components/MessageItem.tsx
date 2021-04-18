import React from "react";
import { getTime } from "utils/date";
import { Message as MessageType } from "~/types";
import { Message } from "./styles";

type MessageItemProps = Omit<MessageType, "uid"> & {
  isAuthor: boolean;
};

const MessageItem = ({ text, date, isAuthor }: MessageItemProps) => {
  return (
    <Message variant={isAuthor ? "primary" : "secondary"}>
      <p className="text">{text}</p>
      <p className="time">{getTime(date)}</p>
    </Message>
  );
};

export default MessageItem;
