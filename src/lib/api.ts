import { EndGame, Game } from "./game";

export interface err {
  message: string;
}

const apiURL = "http://localhost:3001";

const toGame = (data: any) => {
  const g: Game = {
    id: data.id,
    lives: data.lives,
    letterGuesses: data.letter_guesses,
    phraseGuesses: data.phrase_guesses,
    current: data.current,
  };
  return g;
};

const toEndGame = (data: any) => {
  const eg: EndGame = {
    id: data.id,
    lives: data.lives,
    letterGuesses: data.letter_guesses,
    phraseGuesses: data.phrase_guesses,
    answer: data.answer,
    status: data.status,
  };
  return eg;
};

export const createGame = async (answer: string) => {
  const res = await fetch(`${apiURL}/create?answer=${answer}`);
  const data = await res.json();
  return toGame(data);
};

export const getGame = async (id: string): Promise<Game | err> => {
  const res = await fetch(`${apiURL}/game/${id}`);
  const data = await res.json();

  if (!res.ok) {
    return data;
  }

  return toGame(data);
};

export const playGame = async (
  id: string,
  guess: string
): Promise<Game | EndGame | err> => {
  const res = await fetch(`${apiURL}/play`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, guess }),
  });
  const data = await res.json();

  if (!res.ok) {
    return data;
  }

  if (data.status) {
    return toEndGame(data);
  }
  return toGame(data);
};
