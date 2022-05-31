import { Button, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { getGame } from "./lib/api";

import { SetGameProps } from "./lib/game";

function Join({ setGame }: SetGameProps) {
  const [id, setId] = useState("");
  return (
    <>
      <TextInput
        value={id}
        onChange={(e) => setId(e.currentTarget.value)}
        placeholder="ID"
        label="ID"
        variant="filled"
        required
      />
      <Space h="md" />
      <Button
        disabled={!id}
        onClick={() => {
          // getGame(id).then(g => setGame(g))
        }}
      >
        Join Game
      </Button>
    </>
  );
}

export default Join;
