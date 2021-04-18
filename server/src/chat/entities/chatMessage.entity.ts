import { Client } from "../../rooms/entities/client.entity";
import { Room } from "../../rooms/entities/room.entity";
import { Message } from "./message.entity";

export class ChatMessage {
  client: Client;
  room: Room;
  message: Message;
}
