import { useState } from "react";
import Create from "./create";
import { Grid } from "@mantine/core";
import Join from "./join";
import { EndGame, Game } from "./lib/game";
import Play from "./play";

const App = () => {
  const [game, setGame] = useState<Game | EndGame | undefined>();
  return (
    <>
      {!game || game.hasOwnProperty("answer") ? (
        <Grid>
          <Grid.Col span={4}>
            <Create setGame={setGame} />
          </Grid.Col>
          <Grid.Col span={4}>
            <Join setGame={setGame} />
          </Grid.Col>
        </Grid>
      ) : (
        <>
          <Play game={game} setGame={setGame} />
        </>
      )}
      <pre>{JSON.stringify(game, null, 4)}</pre>
    </>
  );
};

export default App;
