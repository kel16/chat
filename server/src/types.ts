type Identifier = {
  uid: string;
};

type ClientPayload = Identifier & {
  name: string;
};

export type MessagePayload = Identifier & {
  text: string;
  date: Date;
};

export type ChatMessagePayload = {
  client: ClientPayload;
  message: MessagePayload;
};
