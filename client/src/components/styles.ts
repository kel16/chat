import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 1130px;
  padding: 0px 15px;
`;

export const Chat = styled.div`
  width: 900px;
  height: 520px;
  border: 4px solid #a0a0a0;
  border-radius: 20px;
`;

export const ChatHeader = styled.div`
  border-bottom: 1px solid #a0a0a0;
  text-align: center;
  font-family: "Lucida Console", "Courier New", monospace;
  font-weight: 800;
  line-height: 30px;
`;

export const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: scroll;
  padding: 10px;
`;

export const ChatControls = styled.form`
  border-top: 1px solid #a0a0a0;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Input = styled.input`
  box-sizing: border-box;
  height: 40px;
  width: 600px;
`;

export const Button = styled.button`
  height: 40px;
  width: 200px;
`;

type MessageProps = {
  variant: "primary" | "secondary";
};

export const Message = styled.div<MessageProps>`
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  border-width: 2px;
  border-style: solid;
  border: ${(props) => (props.variant === "primary" ? " #ccc" : "#dedede")};
  background-color: ${(props) =>
    props.variant === "primary" ? " #ddd" : "#f1f1f1"};
  align-self: ${(props) =>
    props.variant === "primary" ? " flex-end" : "flex-start"};

  .time {
    align-self: ${(props) =>
      props.variant === "primary" ? " flex-end" : "flex-start"};
  }
`;

export const CorridorPage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RoomCreation = styled.form`
  margin: 15px 0;

  ${Button} {
    margin-left: 10px;
  }
`;

export const RoomCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: rgb(126, 126, 126);
  border-radius: 5px;

  &:not(:first-child) {
    margin-top: 5px;
  }
`;
