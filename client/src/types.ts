export type PayloadUid = {
  uid: string;
};

export type ClientPayload = PayloadUid & {
  name: string;
};

export type MessageProps = {
  text: string;
  date: Date;
};

export type MessagePayload = PayloadUid & MessageProps;
