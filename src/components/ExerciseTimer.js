import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Container,
} from "@chakra-ui/react";

import { Timer } from "./Timer";
import { speak } from "../utils/speak";
import { BGCOLOR_REST, BGCOLOR_WORKOUT } from "../constants";

export const ExerciseTimer = (props) => {
  const { sets, rest, work, close, setBgColor } = props;
  const [isRest, setIsRest] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);

  const handleWorkComplete = () => {
    if (currentRound === sets) {
      speak("Finish. Good job");
      close();
      return;
    }

    speak("Rest");

    setIsRest(true);
    setBgColor(BGCOLOR_REST);
  };

  const handleRestComplete = () => {
    if (currentRound === sets) {
      return;
    }
    speak("Start");
    setCurrentRound(currentRound + 1);
    setIsRest(false);
    setBgColor(BGCOLOR_WORKOUT);
  };

  const handleTick = (props) => {
    if (props.seconds === 10) {
      speak("10 seconds. You can do it");
    }

    if (props.seconds === 3) {
      speak("3,2,1");
    }
  };

  return (
    <Container padding="0 1rem">
      <Box display="flex" justifyContent="center">
        <CircularProgress
          max={sets}
          value={currentRound}
          color="orange.400"
          trackColor="orange.100"
          capIsRound={true}
          size="6rem"
          thickness="0.75rem"
        >
          <CircularProgressLabel>
            {currentRound}/{sets}
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box>
        {!isRest && (
          <Timer
            sec={work}
            key="work"
            onComplete={handleWorkComplete}
            reset={close}
            onTick={handleTick}
          />
        )}
        {isRest && (
          <Timer
            sec={rest}
            key="rest"
            onComplete={handleRestComplete}
            reset={close}
          />
        )}
      </Box>
    </Container>
  );
};
