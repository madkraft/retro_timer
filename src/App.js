import React, { useState, useEffect } from "react";
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
  const [lists, setLists] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState(DEFAULT_SETS_NUMBER);
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME);
  const boardId = "b3SrVvdk";

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLists(data);
      });
  }, []);

  const handleWorkoutSelect = (event) => {
    setSelectedWorkout(event.target.value);
  };

  const loadWorkout = () => {
    fetch(
      `https://api.trello.com/1/lists/${selectedWorkout}/cards?key=${process.env.REACT_APP_TRELLO_KEY}&token=${process.env.REACT_APP_TRELLO_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => {
        const exercises = data.filter((exercise) => exercise.idLabels.length);
        setExercises(exercises);
        setSets(exercises.length);
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
        />
      )}
      <div className="nes-select">
        <select onChange={handleWorkoutSelect} value={selectedWorkout}>
          {lists.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="nes-btn is-primary" onClick={loadWorkout}>
        Load workout
      </button>
      <button type="button" className="nes-btn is-warning" onClick={handleResetWorkout}>
        Reset workout
      </button>
    </Box>
  );
}

export default App;
