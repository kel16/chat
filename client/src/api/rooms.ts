import axios, { AxiosError, AxiosResponse } from "axios";
import { SERVER_URL } from "~/constants";
import { ClientRoom } from "~/types";

const roomsPath = `${SERVER_URL}/rooms`;

const instance = axios.create();

export async function getRooms(): Promise<ClientRoom[]> {
  return await instance
    .get(roomsPath)
    .then((response: AxiosResponse<ClientRoom[]>) => response.data)
    .catch((error: AxiosError) => {
      console.error(`Error getting list of rooms: ${error.message}`);
      throw error;
    });
}

export async function addRoom(request: ClientRoom): Promise<void> {
  return await instance
    .post(roomsPath, request)
    .then((response: AxiosResponse<void>) => response.data)
    .catch((error: AxiosError) => {
      console.error(`Error adding a new room: ${error.message}`);
      throw error;
    });
}
