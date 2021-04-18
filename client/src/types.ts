import { Room } from "api/models";

type Identifier = {
  uid: string;
};

export type Client = Identifier & {
  name: string;
};

export type Message = Identifier & {
  text: string;
  date: Date;
};

export type ChatMessage = {
  client: Client;
  room: Room;
  message: Message;
};
