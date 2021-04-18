import { Room } from "api/models";
import React, { useEffect, useState } from "react";
import * as uuid from "uuid";
import { Step } from "~/constants";
import { Client } from "~/types";
import ChatRoom from "./ChatRoom";
import Corridor from "./Corridor";
import { Container, Page } from "./styles";

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(Step.Corridor);
  const [currentRoom, setCurrentRoom] = useState<Room>({ uid: "", topic: "" });
  const [user, setUser] = useState<Client>({
    uid: uuid.v4(),
    name: "stranger",
  });

  useEffect(() => {
    const username = prompt(
      "Hello, stranger! Would you kindly introduce yourself to us?"
    );

    username && setUser({ ...user, name: username });
  }, []);

  const onJoinRoom = (room: Room) => {
    setCurrentRoom(room);
    setCurrentStep(Step.Room);
  };

  const currentPage = {
    [Step.Corridor]: <Corridor user={user} onJoinRoom={onJoinRoom} />,
    [Step.Room]: <ChatRoom room={currentRoom} user={user} />,
  };

  return (
    <Page>
      <Container>{currentPage[currentStep]}</Container>
    </Page>
  );
};

export default App;
