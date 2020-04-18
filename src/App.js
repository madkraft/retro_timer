import React, { useState } from "react";
import "./App.css";
import { Box } from "./components/Box";
import { Counter } from "./components/Counter";
import { Button } from "./components/Button";
import { ExerciseTimer } from "./components/ExerciseTimer";

function formatTime(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`;
}

const DEFAULT_WORK_TIME = 10;
const DEFAULT_REST_TIME = 5;
const DEFAULT_SETS_NUMBER = 3;

function App() {
  const [timerActive, setTimerActive] = useState(false);
  const [sets, setSets] = useState(DEFAULT_SETS_NUMBER);
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);

  const decrementGuard = (time, setStateFn, step) => () => {
    if (time <= 0) {
      return;
    }
    setStateFn(time - step);
  };

  return (
    <Box height="100vh">
      {timerActive && <ExerciseTimer sets={sets} rest={restTime} work={workTime} close={() => setTimerActive(false)} />}
      {!timerActive && (
        <Box backgroundColor="#d77067" height="100%" display="flex" alignItems="center" justifyContent="center">
          <div className="nes-container is-rounded">
            <Box padding="1rem">
              <Counter handleIncrement={() => setSets(sets + 1)} handleDecrement={decrementGuard(sets, setSets, 1)}>
                Rounds: {sets}
              </Counter>
              <Counter handleIncrement={() => setWorkTime(workTime + 5)} handleDecrement={decrementGuard(workTime, setWorkTime, 5)}>
                Work time: {formatTime(workTime)}
              </Counter>
              <Counter handleIncrement={() => setRestTime(restTime + 5)} handleDecrement={decrementGuard(restTime, setRestTime, 5)}>
                Rest time: {formatTime(restTime)}
              </Counter>

              <Button type="button" className="nes-btn is-success" width="100%" padding="1.5rem" onClick={() => setTimerActive(true)}>
                Start
              </Button>
            </Box>
          </div>
        </Box>
      )}
    </Box>
  );
}

export default App;
