import React from "react";
import { getTime } from "utils/date";
import { MessageProps } from "~/types";
import { Message } from "./styles";

type MessageItemProps = MessageProps & {
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
