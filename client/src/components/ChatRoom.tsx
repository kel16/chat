import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import io from "socket.io-client";
import * as uuid from "uuid";
import { ChatMessagePayload, ClientPayload } from "~/types";
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
  const [user, setUser] = useState<ClientPayload>({
    uid: uuid.v4(),
    name: uuid.v4(),
  });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessagePayload[]>([]);

  const socketRef = useRef(io(SOCKET_URL));

  useEffect(() => {
    socketRef.current.on("messageToClient", (message: ChatMessagePayload) => {
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

    const messageData: ChatMessagePayload = {
      client: user,
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
      <ChatHeader>Let's discuss the topic: {"immortality"}</ChatHeader>
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
