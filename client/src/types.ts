type Identifier = {
  uid: string;
};

export type Client = Identifier & {
  name: string;
};

export type Room = Identifier & {
  topic: string;
};

export type ClientRoom = {
  room: Room;
  client: Client;
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
