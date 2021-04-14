import * as React from "react";

type Props = {
  name: string;
};

const App = ({ name }: Props) => {
  return (
    <>
      <h1>Hello {name}</h1>
    </>
  );
};

export default App;
