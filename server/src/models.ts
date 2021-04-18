type Identifier = {
  uid: string;
};

type ClientPayload = Identifier & {
  name: string;
};

export type RoomPayload = Identifier & {
  topic: string;
};

export type MessagePayload = Identifier & {
  text: string;
  date: Date;
};

export type ChatMessagePayload = {
  client: ClientPayload;
  room: RoomPayload;
  message: MessagePayload;
};
