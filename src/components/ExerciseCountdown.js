import React from "react";
import Countdown from "react-countdown";
import { useToast } from "@chakra-ui/react";
import milliseconds from "milliseconds";

import { speak } from "../utils/speak";
import { DEFAULT_COUNTDOWN_TIME } from "../constants";

export const ExerciseCountdown = (props) => {
  const { countDownTime, onComplete, startMessage } = props;
  const toast = useToast();

  return (
    <Countdown
      date={countDownTime}
      onStart={() => {
        speak(startMessage);
        toast({
          title: "Get ready 3... 2... 1...",
          status: "warning",
          duration: milliseconds.seconds(DEFAULT_COUNTDOWN_TIME),
        });
      }}
      onComplete={onComplete}
      renderer={() => null}
    />
  );
};
