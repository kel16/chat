import React from "react";
import ChatRoom from "./ChatRoom";
import { Container, Page } from "./styles";

const App: React.FC = () => {
  return (
    <Page>
      <Container>
        <ChatRoom />
      </Container>
    </Page>
  );
};

export default App;
