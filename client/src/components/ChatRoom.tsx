import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import * as uuid from "uuid";
import { ClientPayload, MessagePayload } from "~/types";
import MessageItem from "./MessageItem";
import {
  Button,
  Chat,
  ChatContent,
  ChatControls,
  ChatHeader,
  Input,
} from "./styles";

const SOCKET_URL = "http://localhost:8000";

type ChatRoomProps = {
  topic: string;
  client: ClientPayload;
};

const ChatRoom = () => {
  const [userName, setUserName] = useState("you");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  const socketRef = useRef(io(SOCKET_URL));

  useEffect(() => {
    socketRef.current.on("msgToClient", (message: MessagePayload) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const onSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message) return;

    const messageData: MessagePayload = {
      uid: uuid.v4(),
      text: message,
      date: new Date(),
    };

    socketRef.current.emit("msgToServer", messageData);
    setMessage("");
  };

  return (
    <Chat>
      <ChatHeader>Let's discuss the topic: {"immortality"}</ChatHeader>
      <ChatContent>
        {messages.map(({ uid, text, date }) => (
          <MessageItem key={uid} text={text} date={date} />
        ))}
      </ChatContent>
      <ChatControls onSubmit={onSendMessage}>
        <Input
          value={message}
          onChange={onChangeMessage}
          placeholder="Your message..."
          type="text"
        />
        <Button type="submit">Send</Button>
      </ChatControls>
    </Chat>
  );
};

export default ChatRoom;
