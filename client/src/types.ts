import { Room } from "api/models";

export type Identifier = {
  uid: string;
};

export type ClientPayload = Identifier & {
  name: string;
};

export type MessageProps = {
  text: string;
  date: Date;
};

export type MessagePayload = Identifier & MessageProps;

export type ChatMessagePayload = {
  client: ClientPayload;
  room: Room;
  message: MessagePayload;
};
