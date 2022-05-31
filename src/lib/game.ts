export interface Game {
  id: string;
  lives: number;
  letterGuesses: string;
  phraseGuesses: Array<string>;
  current: string;
}

export interface EndGame {
  id: string;
  lives: number;
  letterGuesses: string;
  phraseGuesses: Array<string>;
  answer: string;
  status: string;
}

export interface SetGameProps {
  setGame: React.Dispatch<React.SetStateAction<Game | EndGame | undefined>>
}
