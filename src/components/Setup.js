import React from "react";
import { Button, Container } from "@chakra-ui/react";

import { Counter } from "./Counter";
import { formatTime } from "../utils/formatTime";

export const Setup = (props) => {
  const {
    onSetsIncrement,
    onSetsDecrement,
    onWorkTimeIncrement,
    onRestTimeIncrement,
    onWorkTimeDecrement,
    onRestTimeDecrement,
    sets,
    workTime,
    restTime,
    onStart,
  } = props;

  return (
    <Container padding="0 1rem">
      <Counter
        handleIncrement={onSetsIncrement}
        handleDecrement={onSetsDecrement}
      >
        Rounds: {sets}
      </Counter>
      <Counter
        handleIncrement={onWorkTimeIncrement}
        handleDecrement={onWorkTimeDecrement}
      >
        Work time: {formatTime(workTime)}
      </Counter>
      <Counter
        handleIncrement={onRestTimeIncrement}
        handleDecrement={onRestTimeDecrement}
      >
        Rest time: {formatTime(restTime)}
      </Counter>

      <Button
        color="white"
        variant="outline"
        width="100%"
        padding="1.5rem"
        onClick={onStart}
      >
        Start
      </Button>
    </Container>
  );
};
