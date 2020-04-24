import React, { useState } from "react";
import { Timer } from "./Timer";
import { Box } from "./Box";
import { speak } from "../utils/speak";
import styled from "styled-components";

const Exercise = styled.h1`
  margin-bottom: 2rem;
  text-align: "center";
`;

export const ExerciseTimer = (props) => {
  const { sets, rest, work, close, exercises } = props;
  const [isRest, setIsRest] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);

  const handleWorkComplete = () => {
    if (currentRound === sets) {
      speak("Finish. Good job");
      close();
      return;
    }

    if (exercises.length) {
      speak(`Rest. Next: ${exercises[currentRound].name}`);
    } else {
      speak("Rest");
    }

    setIsRest(true);
  };

  const handleRestComplete = () => {
    if (currentRound === sets) {
      return;
    }
    speak("Start");
    setCurrentRound(currentRound + 1);
    setIsRest(false);
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
    <Box
      backgroundColor={isRest ? "#68D391" : "#ECC94B"}
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {exercises.length && !isRest ? <Exercise style={{ textAlign: "center" }}>{exercises[currentRound - 1].name}</Exercise> : null}
      <div className="nes-container is-rounded">
        <Box padding="1rem">
          <Box fontSize="25px" textAlign="center">
            Round: {currentRound}/{sets}
          </Box>
          <Box>
            {!isRest && <Timer sec={work} key="work" onComplete={handleWorkComplete} reset={close} onTick={handleTick} />}
            {isRest && <Timer sec={rest} key="rest" onComplete={handleRestComplete} reset={close} />}
          </Box>
        </Box>
      </div>
    </Box>
  );
};
