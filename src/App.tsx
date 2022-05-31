import { useState } from "react";
import Create from "./create";
import { Grid } from "@mantine/core";
import Join from "./join";
import { EndGame, Game } from "./lib/game";

function App() {
  const [game, setGame] = useState<Game | EndGame | undefined>();
  return (
    <>
      {(!game ||
        game.hasOwnProperty("answer") ||
        game.hasOwnProperty("message")) && (
        <Grid>
          <Grid.Col span={4}>
            <Create setGame={setGame} />
          </Grid.Col>
          <Grid.Col span={4}>
            <Join setGame={setGame} />
          </Grid.Col>
        </Grid>
      )}
      <pre>{JSON.stringify(game, null, 4)}</pre>
    </>
  );
}

export default App;
