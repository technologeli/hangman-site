import { Button, Space, TextInput } from "@mantine/core";
import { useState } from "react";

import { createGame } from "./lib/api";
import { SetGameProps } from "./lib/game";

function Create({ setGame }: SetGameProps) {
  const [answer, setAnswer] = useState("");
  return (
    <>
      <TextInput
        value={answer}
        onChange={(e) => setAnswer(e.currentTarget.value)}
        placeholder="Answer"
        label="Answer"
        variant="filled"
        required
      />
      <Space h="md" />
      <Button
        disabled={!answer}
        onClick={() => {
          createGame(answer).then((g) => setGame(g));
        }}
      >
        Create Game
      </Button>
    </>
  );
}

export default Create;
