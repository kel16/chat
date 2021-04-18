import { Room } from "api/models";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import * as uuid from "uuid";
import { SERVER_URL } from "~/constants";
import { ChatMessage, Client } from "~/types";
import MessageItem from "./MessageItem";
import {
  Button,
  Chat,
  ChatContent,
  ChatControls,
  ChatHeader,
  Input,
} from "./styles";

type ChatRoomProps = {
  room: Room;
  user: Client;
};

const ChatRoom = ({ room, user }: ChatRoomProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const socketRef = useRef(io(SERVER_URL));

  useEffect(() => {
    socketRef.current.emit("joinRoom", room);

    socketRef.current.on("messageToClient", (message: ChatMessage) => {
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

    if (!message.trim()) return;

    const messageData: ChatMessage = {
      client: user,
      room,
      message: {
        uid: uuid.v4(),
        text: message,
        date: new Date(),
      },
    };

    socketRef.current.emit("messageToServer", messageData);
    setMessage("");
  };

  return (
    <Chat>
      <ChatHeader>Let's discuss the topic: {room.topic}</ChatHeader>
      <ChatContent>
        {messages.map(
          ({
            client: { uid: clientId },
            message: { uid: messageId, text, date },
          }) => (
            <MessageItem
              key={messageId}
              text={text}
              date={date}
              isAuthor={clientId === user.uid}
            />
          )
        )}
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
