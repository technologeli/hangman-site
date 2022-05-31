import { Button, Space, TextInput } from "@mantine/core";
import { useState } from "react";
import { err, playGame } from "./lib/api";
import { EndGame, Game, SetGameProps } from "./lib/game";

interface PlayProps extends SetGameProps {
  game: Game | EndGame;
}

const Play = ({ game, setGame }: PlayProps) => {
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      <TextInput
        value={guess}
        onChange={(e) => setGuess(e.currentTarget.value)}
        placeholder="Answer"
        label="Answer"
        variant="filled"
        error={error}
        required
      />
      <Space h="md" />
      <Button
        disabled={!guess}
        onClick={() => {
          playGame(game.id, guess).then((g) => {
            if (g.hasOwnProperty("message")) {
              setError((g as err).message);
            } else {
              setGame(g as Game);
              setGuess("");
            }
          });
        }}
      >
        Guess {guess.length <= 1 ? "letter" : "phrase"}
      </Button>
    </>
  );
};
export default Play;
