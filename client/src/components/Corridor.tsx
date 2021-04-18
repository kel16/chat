import { addRoom, getRooms } from "api/rooms";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as uuid from "uuid";
import { Client, ClientRoom, Room } from "~/types";
import { Button, CorridorPage, Input, RoomCard, RoomCreation } from "./styles";

type CorridorProps = {
  user: Client;
  onJoinRoom: (room: Room) => void;
};

const Corridor = ({ user, onJoinRoom }: CorridorProps) => {
  const [clientRooms, setClientRooms] = useState<ClientRoom[]>([]);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      setClientRooms(data);
    };

    fetchRooms();
  }, []);

  const onChangeTopic = (event: ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const createRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newRoom: Room = {
      uid: uuid.v4(),
      topic,
    };

    await addRoom({ client: user, room: newRoom });
    setTopic("");
    onJoinRoom(newRoom);
  };

  return (
    <CorridorPage>
      <div className="instructions">
        <h1>Welcome to the party, {user.name}!</h1>
        <p>We are happy to offer you some rooms with topics to debate over.</p>
        <p>
          You are free to suggest your own topic and we will provide you with a
          free room where you can wait for your opponents. Please be polite and
          have a nice chat!
        </p>
      </div>
      <RoomCreation onSubmit={createRoom}>
        <Input
          value={topic}
          onChange={onChangeTopic}
          placeholder="Provide your own topic here"
        ></Input>
        <Button type="submit">Give me a new room!</Button>
      </RoomCreation>
      {clientRooms.map(({ client, room }) => (
        <RoomCard key={room.uid}>
          <div className="title">
            {client.name}: {room.topic}
          </div>
          <Button onClick={() => onJoinRoom(room)}>Join room</Button>
        </RoomCard>
      ))}
    </CorridorPage>
  );
};

export default Corridor;
