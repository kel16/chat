import { Room } from "api/models";
import React, { useState } from "react";
import * as uuid from "uuid";
import { Step } from "~/constants";
import { ClientPayload } from "~/types";
import ChatRoom from "./ChatRoom";
import Corridor from "./Corridor";
import { Container, Page } from "./styles";

const user: ClientPayload = {
  uid: uuid.v4(),
  name: uuid.v4(),
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(Step.Corridor);
  const [currentRoom, setCurrentRoom] = useState<Room>({ uid: "", topic: "" });

  const onJoinRoom = (room: Room) => {
    setCurrentRoom(room);
    setCurrentStep(Step.Room);
  };

  const currentPage = {
    [Step.Corridor]: <Corridor onJoinRoom={onJoinRoom} />,
    [Step.Room]: <ChatRoom room={currentRoom} user={user} />,
  };

  return (
    <Page>
      <Container>{currentPage[currentStep]}</Container>
    </Page>
  );
};

export default App;
