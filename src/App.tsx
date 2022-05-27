import { Button, TextInput } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { useState } from 'react';

interface Game {
  id: string;
  lives: number;
  letterGuesses: string;
  phraseGuesses: Array<string>;
  current: string;
}

interface EndGame {
  id: string;
  lives: number;
  letterGuesses: string;
  phraseGuesses: Array<string>;
  answer: string;
  status: string;
}

const apiURL = "http://localhost:3001";

const toGame = (data: any) => {
  const g: Game = {
    id: data.id,
    lives: data.lives,
    letterGuesses: data.letter_guesses,
    phraseGuesses: data.phrase_guesses,
    current: data.current
  };
  return g;
}

const toEndGame = (data: any) => {
  const eg: EndGame = {
    id: data.id,
    lives: data.lives,
    letterGuesses: data.letter_guesses,
    phraseGuesses: data.phrase_guesses,
    answer: data.answer,
    status: data.status
  }
  return eg;
}

const createGame = async (answer: string) => {
  const res = await fetch(`${apiURL}/create?answer=${answer}`);
  const data = await res.json();
  return toGame(data);
}

const getGame = async (id: string) => {
  const res = await fetch(`${apiURL}/game/${id}`);
  const data = await res.json();
  return toGame(data);
}

const playGame = async (id: string, guess: string) => {
  const res = await fetch(`${apiURL}/play`,
    {
      method: "Post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, guess })
    }
  );
  const data = await res.json();
  if (data.status) {
    return toEndGame(data)
  }
  return toGame(data);
}

function App() {
  const [answer, setAnswer] = useState('');
  const [game, setGame] = useState<Game | EndGame>();
  return (
    <>
      <TextInput
        value={answer}
        onChange={e => setAnswer(e.currentTarget.value)}
        placeholder="Answer"
        label="Answer"
        variant='filled'
        required
      />
      <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        createGame(answer).then(g => setGame(g))
      }}>Create Game</Button>
      <pre>
        {JSON.stringify(game, null, 4)}
      </pre>
    </>
  );
}

export default App
