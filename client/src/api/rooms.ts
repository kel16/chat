import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URL } from "~/constants";
import { Room } from "./models";

const roomsPath = `${SERVER_URL}/rooms`;

const instance = axios.create();

export async function getRooms(): Promise<Room[]> {
  return await instance
    .get(roomsPath)
    .then((response: AxiosResponse<Room[]>) => response.data)
    .catch((error: AxiosError) => {
      console.error(`Error getting list of rooms: ${error.message}`);
      throw error;
    });
}

export async function addRoom(room: Room): Promise<void> {
  return await instance
    .post(roomsPath, room)
    .then((response: AxiosResponse<void>) => response.data)
    .catch((error: AxiosError) => {
      console.error(`Error adding a new room: ${error.message}`);
      throw error;
    });
}
