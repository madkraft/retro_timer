import React, { useState } from "react";
import milliseconds from "milliseconds";
import NoSleep from "nosleep.js";

import "./App.css";
import { Box } from "./components/Box";
import { ExerciseTimer } from "./components/ExerciseTimer";
import { speak } from "./utils/speak";
import { ExerciseCountdown } from "./components/ExerciseCountdown";
import { Setup } from "./components/Setup";

const DEFAULT_WORK_TIME = 10;
const DEFAULT_REST_TIME = 5;
const DEFAULT_SETS_NUMBER = 3;

const noSleep = new NoSleep();

function App() {
  const [timerActive, setTimerActive] = useState(false);
  const [preTimerActive, setPreTimerActive] = useState(false);
  const [sets, setSets] = useState(DEFAULT_SETS_NUMBER);
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);

  const decrementGuard = (time, setStateFn, step) => () => {
    if (time <= 0) {
      return;
    }
    setStateFn(time - step);
  };
  const countDownTime = Date.now() + milliseconds.seconds(3);

  const handleStart = () => {
    setPreTimerActive(true);
    noSleep.enable();
  };

  const handleClose = () => {
    setTimerActive(false);
    noSleep.disable();
  };

  const handleExerciseCountdownComplete = () => {
    speak("Go go go!!!");
    setTimeout(() => {
      setPreTimerActive(false);
      setTimerActive(true);
    }, 1000);
  };

  const handleSetsIncrement = () => setSets(sets + 1);
  const handleSetsDecrement = decrementGuard(sets, setSets, 1);

  const handleWorkTimeIncrement = () => setWorkTime(workTime + 5);
  const handleWorkTimeDecrement = decrementGuard(workTime, setWorkTime, 5);

  const handleRestTimeIncrement = () => setRestTime(restTime + 5);
  const handleRestTimeDecrement = decrementGuard(restTime, setRestTime, 5);

  return (
    <Box height="100vh">
      {preTimerActive && <ExerciseCountdown countDownTime={countDownTime} onComplete={handleExerciseCountdownComplete} />}
      {timerActive && <ExerciseTimer sets={sets} rest={restTime} work={workTime} close={handleClose} />}
      {!timerActive && (
        <Setup
          sets={sets}
          onSetsIncrement={handleSetsIncrement}
          onSetsDecrement={handleSetsDecrement}
          workTime={workTime}
          onWorkTimeIncrement={handleWorkTimeIncrement}
          onWorkTimeDecrement={handleWorkTimeDecrement}
          restTime={restTime}
          onRestTimeIncrement={handleRestTimeIncrement}
          onRestTimeDecrement={handleRestTimeDecrement}
          onStart={handleStart}
        />
      )}
    </Box>
  );
}

export default App;
