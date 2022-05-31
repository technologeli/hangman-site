import { Button, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { err, getGame } from "./lib/api";

import { Game, SetGameProps } from "./lib/game";

const Join = ({ setGame }: SetGameProps) => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <TextInput
        value={id}
        onChange={(e) => setId(e.currentTarget.value)}
        placeholder="ID"
        label="ID"
        variant="filled"
        error={error}
        required
      />
      <Space h="md" />
      <Button
        disabled={!id}
        onClick={() => {
          getGame(id).then((g) => {
            if (g.hasOwnProperty("message")) {
              setError((g as err).message);
            } else {
              setGame(g as Game);
            }
          });
        }}
      >
        Join Game
      </Button>
    </>
  );
};

export default Join;
