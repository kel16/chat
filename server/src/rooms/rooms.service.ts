import { Injectable } from "@nestjs/common";
import { ClientRoom } from "./entities/clientRoom.entity";

@Injectable()
export class RoomsService {
  private readonly clientRooms: ClientRoom[] = [];

  create(room: ClientRoom) {
    this.clientRooms.push(room);
  }

  findAll(): ClientRoom[] {
    return this.clientRooms;
  }

  findOne(uid: string) {
    return this.clientRooms.find((clientRoom) => clientRoom.room.uid === uid);
  }
}
