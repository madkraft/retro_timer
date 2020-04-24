import React, { useState } from "react";
import { Timer } from "./Timer";
import { Box } from "./Box";
import { speak } from "../utils/speak";

export const ExerciseTimer = (props) => {
  const { sets, rest, work, close } = props;
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

    if (props.seconds === 2) {
      speak("3,2,1");
    }
  };

  return (
    <Box backgroundColor={isRest ? "#68D391" : "#ECC94B"} height="100%" display="flex" alignItems="center" justifyContent="center">
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
