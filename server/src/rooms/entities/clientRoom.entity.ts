import { Room } from "src/rooms/entities/room.entity";
import { Client } from "./client.entity";

export class ClientRoom {
  client: Client;
  room: Room;
}
