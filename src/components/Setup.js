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
    resetWorkout,
    authorizeTrello,
    selectWorkout,
    workoutList,
  } = props;

  return (
    <Box backgroundColor="#d77067" height="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
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
      <Box marginTop="2rem" display="flex">
        {window.Trello.authorized() && (
          <>
            <Box className="nes-select" marginRight="2rem">
              <select onChange={selectWorkout}>
                {workoutList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Box>
            <button type="button" className="nes-btn is-warning" onClick={resetWorkout}>
              Clear
            </button>
          </>
        )}
        {!window.Trello.authorized() && (
          <button type="button" className="nes-btn is-warning" onClick={authorizeTrello}>
            Get workouts
          </button>
        )}
      </Box>
    </Box>
  );
};
