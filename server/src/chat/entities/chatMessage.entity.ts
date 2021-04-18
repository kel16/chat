import { Room } from "../../rooms/entities/room.entity";
import { Client } from "./client.entity";
import { Message } from "./message.entity";

export class ChatMessage {
  client: Client;
  room: Room;
  message: Message;
}
