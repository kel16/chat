import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Room } from "./entities/room.entity";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() room: Room) {
    return this.roomsService.create(room);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(":uid")
  findOne(@Param("uid") uid: string) {
    return this.roomsService.findOne(uid);
  }
}
