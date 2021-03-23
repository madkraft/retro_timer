import React, { useState } from "react";
import milliseconds from "milliseconds";
import { disableBodyScroll } from "body-scroll-lock";
import { Box } from "@chakra-ui/react";

import { ExerciseTimer } from "./components/ExerciseTimer";
import { speak } from "./utils/speak";
import { ExerciseCountdown } from "./components/ExerciseCountdown";
import { Setup } from "./components/Setup";
import {
  BGCOLOR_SETUP,
  BGCOLOR_WORKOUT,
  DEFAULT_REST_TIME,
  DEFAULT_SETS_NUMBER,
  DEFAULT_WORK_TIME,
  DEFAULT_COUNTDOWN_TIME,
} from "./constants";

export const App = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [preTimerActive, setPreTimerActive] = useState(false);
  const [sets, setSets] = useState(DEFAULT_SETS_NUMBER);
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);
  const [bgColor, setBgColor] = useState(BGCOLOR_SETUP);

  disableBodyScroll(document.getElementById("root"));

  const decrementGuard = (time, setStateFn, step) => () => {
    if (time <= 0) {
      return;
    }
    setStateFn(time - step);
  };
  const countDownTime =
    Date.now() + milliseconds.seconds(DEFAULT_COUNTDOWN_TIME);

  const handleStart = () => {
    setPreTimerActive(true);
    // noSleep.enable();
  };

  const handleClose = () => {
    setTimerActive(false);
    setBgColor(BGCOLOR_SETUP);
    // noSleep.disable();
  };

  const handleExerciseCountdownComplete = () => {
    speak("Go go go!!!");
    setTimeout(() => {
      setPreTimerActive(false);
      setTimerActive(true);
      setBgColor(BGCOLOR_WORKOUT);
    }, 1000);
  };

  const handleSetsIncrement = () => setSets(sets + 1);
  const handleSetsDecrement = decrementGuard(sets, setSets, 1);

  const handleWorkTimeIncrement = () => setWorkTime(workTime + 5);
  const handleWorkTimeDecrement = decrementGuard(workTime, setWorkTime, 5);

  const handleRestTimeIncrement = () => setRestTime(restTime + 5);
  const handleRestTimeDecrement = decrementGuard(restTime, setRestTime, 5);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      bgGradient={bgColor}
    >
      {preTimerActive && (
        <ExerciseCountdown
          countDownTime={countDownTime}
          onComplete={handleExerciseCountdownComplete}
          startMessage={"Get ready"}
        />
      )}
      {timerActive && (
        <ExerciseTimer
          sets={sets}
          rest={restTime}
          work={workTime}
          close={handleClose}
          setBgColor={setBgColor}
        />
      )}
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
};
