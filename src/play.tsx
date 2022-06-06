import {
  Button,
  Notification,
  Progress,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { err, getGame, playGame } from "./lib/api";
import { EndGame, Game, isUpdated, SetGameProps } from "./lib/game";

interface PlayProps extends SetGameProps {
  game: Game | EndGame;
}

const refreshTime = 10;
const refreshInterval = 0.05;

const Play = ({ game, setGame }: PlayProps) => {
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(refreshTime);
  const [displayNotif, setDisplayNotif] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (count <= 0) {
        setCount(refreshTime);
        getGame(game.id).then((g) => {
          if (g.hasOwnProperty("message")) {
            setError((g as err).message);
          } else {
            setGame(g as Game);
          }
        });
      } else {
        setCount(count - refreshInterval);
      }
    }, refreshInterval * 1000);

    return () => clearTimeout(timeoutId);
  }, [count]);

  return (
    <>
      <Text size="md">Game ID: {game.id}</Text>
      <Text size="md">Lives left: {game.lives}</Text>
      <Text size="md">Guessed Letters: {game.letterGuesses}</Text>
      <Text size="md">Guessed Phrases: {game.phraseGuesses}</Text>
      {game.hasOwnProperty("current") && (
        <Text size="md">Current: {(game as Game).current}</Text>
      )}
      {game.hasOwnProperty("answer") && (
        <Text size="md">Answer: {(game as EndGame).answer}</Text>
      )}
      <Space h="md" />

      {!game.hasOwnProperty("answer") && (
        <>
          <Text>Refreshing in {Math.ceil(count)}...</Text>
          <Progress value={(count * 100) / refreshTime} />
          <Space h="md" />

          <TextInput
            value={guess}
            onChange={(e) => {
              setGuess(e.currentTarget.value);
              setError("");
            }}
            placeholder="Guess"
            aria-label="Guess"
            variant="filled"
            error={error}
          />
          <Space h="md" />

          <Button
            fullWidth
            disabled={!guess}
            onClick={() => {
              setCount(refreshTime);
              getGame(game.id)
                .then((g) => {
                  if (g.hasOwnProperty("message")) {
                    setError((g as err).message);
                  } else {
                    const up = isUpdated(g as Game, game);
                    if (up) {
                      setGame(g as Game);
                      throw "Game state has changed.";
                    }
                  }
                })
                .then(() => playGame(game.id, guess))
                .then((g) => {
                  if (g.hasOwnProperty("message")) {
                    setError((g as err).message);
                  } else {
                    setGame(g as Game);
                    setGuess("");
                  }
                })
                .catch((e) => {
                  setDisplayNotif(true);
                });
            }}
          >
            Guess {guess.length <= 1 ? "letter" : "phrase"}
          </Button>
        </>
      )}
      {game.hasOwnProperty("answer") && (
        <>
          <Text size="md">
            {(game as EndGame).status === "WIN" ? "You win!" : "You lose!"}
          </Text>
          <Button fullWidth onClick={() => setGame(undefined)}>
            Back to Menu
          </Button>
        </>
      )}
      {displayNotif && (
        <Notification
          title="Game state has updated"
          onClose={() => setDisplayNotif(false)}
        >
          Update your guess, if you would like.
        </Notification>
      )}
    </>
  );
};
export default Play;
