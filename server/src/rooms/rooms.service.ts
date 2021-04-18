import { Injectable } from "@nestjs/common";
import { Room } from "./entities/room.entity";

@Injectable()
export class RoomsService {
  private readonly rooms: Room[] = [];

  create(room: Room) {
    this.rooms.push(room);
  }

  findAll(): Room[] {
    return this.rooms;
  }

  findOne(uid: string) {
    return this.rooms.find((room) => room.uid === uid);
  }
}
