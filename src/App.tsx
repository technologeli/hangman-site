import { useState } from "react";
import Create from "./create";
import {
  Center,
  Container,
  Divider,
  SegmentedControl,
  Space,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Join from "./join";
import { EndGame, Game } from "./lib/game";
import Play from "./play";

const App = () => {
  const theme = useMantineTheme();
  const [game, setGame] = useState<Game | EndGame | undefined>();
  const [segment, setSegment] = useState("create");
  return (
    <Center style={{ height: innerHeight }}>
      <Container style={{ minWidth: innerWidth / 2 }}>
        <Title order={1} align="center">
          Hangman
        </Title>
        <Divider my="sm" />
        <Space h="md" />
        {!game ? (
          <Container>
            <SegmentedControl
              fullWidth
              color={theme.primaryColor}
              value={segment}
              onChange={setSegment}
              data={[
                { label: "Create", value: "create" },
                { label: "Join", value: "join" },
              ]}
            />
            <Space h="md" />
            {segment === "create" && <Create setGame={setGame} />}
            {segment === "join" && <Join setGame={setGame} />}
          </Container>
        ) : (
          <>
            <Play game={game} setGame={setGame} />
          </>
        )}
      </Container>
    </Center>
  );
};

export default App;
