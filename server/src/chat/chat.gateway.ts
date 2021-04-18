import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatMessagePayload, RoomPayload } from "../models";

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("ChatGateway");

  @SubscribeMessage("messageToServer")
  handleMessage(client: Socket, payload: ChatMessagePayload): void {
    this.server.to(payload.room.uid).emit("messageToClient", payload);
  }

  @SubscribeMessage("createRoom")
  handleRoomCreate(client: Socket, room: RoomPayload) {
    client.join(room.uid);
    client.emit("joinedRoom", room);
  }

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: Socket, room: RoomPayload) {
    client.join(room.uid);
    client.emit("joinedRoom", room);
  }

  @SubscribeMessage("leaveRoom")
  handleRoomLeave(client: Socket, room: RoomPayload) {
    client.leave(room.uid);
    client.emit("leftRoom", room);
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
