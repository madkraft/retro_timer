import React from "react";
import { Box } from "./Box";
import { Counter } from "./Counter";
import { formatTime } from "../utils/formatTime";
import { Button } from "./Button";

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
    <Box backgroundColor="#d77067" height="100%" display="flex" alignItems="center" justifyContent="center">
      <div className="nes-container is-rounded">
        <Box padding="1rem">
          <Counter handleIncrement={onSetsIncrement} handleDecrement={onSetsDecrement}>
            Rounds: {sets}
          </Counter>
          <Counter handleIncrement={onWorkTimeIncrement} handleDecrement={onWorkTimeDecrement}>
            Work time: {formatTime(workTime)}
          </Counter>
          <Counter handleIncrement={onRestTimeIncrement} handleDecrement={onRestTimeDecrement}>
            Rest time: {formatTime(restTime)}
          </Counter>

          <Button type="button" className="nes-btn is-success" width="100%" padding="1.5rem" onClick={onStart}>
            Start
          </Button>
        </Box>
      </div>
    </Box>
  );
};
