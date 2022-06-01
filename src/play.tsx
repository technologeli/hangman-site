import { Button, Notification, Space, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { err, getGame, playGame } from "./lib/api";
import { EndGame, Game, isUpdated, SetGameProps } from "./lib/game";

interface PlayProps extends SetGameProps {
  game: Game | EndGame;
}

const refreshTime = 10;

const Play = ({ game, setGame }: PlayProps) => {
  const [guess, setGuess] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(refreshTime);
  const [displayNotif, setDisplayNotif] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (count === 1) {
        setCount(refreshTime);
        getGame(game.id).then((g) => {
          if (g.hasOwnProperty("message")) {
            setError((g as err).message);
          } else {
            setGame(g as Game);
          }
        });
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [count]);

  return (
    <>
      <Text>Refreshing in {count}...</Text>
      <TextInput
        value={guess}
        onChange={(e) => {
          setGuess(e.currentTarget.value);
          setError("");
        }}
        placeholder="Guess"
        label="Guess"
        variant="filled"
        error={error}
        required
      />
      <Space h="md" />
      <Button
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
