import { Room } from "api/models";
import { addRoom, getRooms } from "api/rooms";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as uuid from "uuid";
import { Button, CorridorPage, Input, RoomCard, RoomCreation } from "./styles";

type CorridorProps = {
  onJoinRoom: (room: Room) => void;
};

const Corridor = ({ onJoinRoom }: CorridorProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [topic, setTopic] = useState("");

  const fetchRooms = async () => {
    const data = await getRooms();
    setRooms(data);
  };

  useEffect(() => {
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

    await addRoom(newRoom);
    setTopic("");
    onJoinRoom(newRoom);
  };

  return (
    <CorridorPage>
      <div className="instructions">
        <h1>Welcome to the party!</h1>
        <p>We are happy to offer you some rooms with topics to debate over.</p>
        <p>
          You are free to suggest your own topic and we will provide you with a
          room where you can wait for your opponents. Please be polite and have
          a nice chat!
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
      {rooms.map((room) => (
        <RoomCard key={room.uid}>
          <div className="title">{room.topic}</div>
          <Button onClick={() => onJoinRoom(room)}>Join room</Button>
        </RoomCard>
      ))}
    </CorridorPage>
  );
};

export default Corridor;
