import React, { useState } from "react";
import milliseconds from "milliseconds";
import NoSleep from "nosleep.js";

import "./App.css";
import { Box } from "./components/Box";
import { ExerciseTimer } from "./components/ExerciseTimer";
import { speak } from "./utils/speak";
import { ExerciseCountdown } from "./components/ExerciseCountdown";
import { Setup } from "./components/Setup";

const DEFAULT_WORK_TIME = 45;
const DEFAULT_REST_TIME = 15;
const DEFAULT_SETS_NUMBER = 8;

const noSleep = new NoSleep();

function App() {
  const [timerActive, setTimerActive] = useState(false);
  const [preTimerActive, setPreTimerActive] = useState(false);
  const [workoutList, setWorkoutList] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState(DEFAULT_SETS_NUMBER);
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);
  const boardId = "b3SrVvdk";
  const descriptionLabelId = "5ea544c4c52dba7aa9b89e4b";

  const authenticationSuccess = () => {
    window.Trello.get(`boards/${boardId}/lists`, (data) => {
      setWorkoutList(data);
    });
  };

  const handleWorkoutSelect = (event) => {
    window.Trello.get(`lists/${event.target.value}/cards`, (data) => {
      const exercises = data.filter((exercise) => !exercise.idLabels.includes(descriptionLabelId));
      setExercises(exercises);
      setSets(exercises.length);
    });
  };

  const authenticationFailure = () => {
    console.log("Failed authentication");
  };

  const handleAuthorizeTrello = () => {
    window.Trello.authorize({
      name: "Retro Timer",
      scope: {
        read: "true",
      },
      success: authenticationSuccess,
      error: authenticationFailure,
    });
  };

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

  const handleResetWorkout = () => {
    setExercises([]);
    setSets(DEFAULT_SETS_NUMBER);
    setRestTime(DEFAULT_REST_TIME);
    setWorkTime(DEFAULT_WORK_TIME);
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
      {preTimerActive && (
        <ExerciseCountdown
          countDownTime={countDownTime}
          onComplete={handleExerciseCountdownComplete}
          startMessage={exercises.length ? exercises[0].name : "Get ready"}
        />
      )}
      {timerActive && <ExerciseTimer sets={sets} rest={restTime} work={workTime} close={handleClose} exercises={exercises} />}
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
          workoutList={workoutList}
          resetWorkout={handleResetWorkout}
          authorizeTrello={handleAuthorizeTrello}
          selectWorkout={handleWorkoutSelect}
        />
      )}
    </Box>
  );
}

export default App;
