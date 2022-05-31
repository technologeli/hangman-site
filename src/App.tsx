import { useState } from "react";
import Create from "./create";
import { EndGame, Game } from "./lib/game";
import { Grid } from "@mantine/core";
import Join from "./join";

function App() {
  const [game, setGame] = useState<Game | EndGame>();
  return (
    <>
      {(!game || game.hasOwnProperty("answer")) && (
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
