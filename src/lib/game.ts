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
  setGame: React.Dispatch<React.SetStateAction<Game | EndGame | undefined>>;
}

export const isUpdated = (g1: Game | EndGame, g2: Game | EndGame) => {
  // if different games
  if (g1.id !== g2.id) return undefined;

  // if one is completed but the other is not
  const g1DoneOnly =
    g1.hasOwnProperty("answer") && !g2.hasOwnProperty("answer");
  const g2DoneOnly =
    !g1.hasOwnProperty("answer") && g2.hasOwnProperty("answer");

  if (g1DoneOnly || g2DoneOnly) return true;

  // phrases are different
  for (let i = 0; i < g1.phraseGuesses.length; i++) {
    if (g1.phraseGuesses.at(i) !== g2.phraseGuesses.at(i)) return true;
  }

  // different lives, letter guesses
  return g1.lives !== g2.lives || g1.letterGuesses !== g2.letterGuesses;
};
