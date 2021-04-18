import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ClientRoom } from "./entities/clientRoom.entity";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() room: ClientRoom) {
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
