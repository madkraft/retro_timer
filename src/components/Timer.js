import React from "react";
import Countdown from "react-countdown";
import milliseconds from "milliseconds";
import { Box, Button, Progress } from "@chakra-ui/react";

export const Timer = (props) => {
  const { sec = 0, onComplete, onTick, reset, showProgress } = props;
  const countDownTime = Date.now() + milliseconds.seconds(sec);

  const handlePause = (api) => {
    if (api.isPaused()) {
      api.start();
    } else {
      api.pause();
    }
  };

  return (
    <Countdown
      date={countDownTime}
      onComplete={onComplete}
      onTick={onTick}
      renderer={(props) => {
        return (
          <>
            <Box fontSize="5rem" margin="1rem 0" textAlign="center">
              {props.formatted.minutes}:{props.formatted.seconds}
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop="2rem">
              <Button variant="outline" borderColor="black" onClick={reset}>
                Reset
              </Button>

              {!props.api.isPaused() && (
                <Button
                  variant="outline"
                  borderColor="black"
                  onClick={() => handlePause(props.api)}
                >
                  Stop
                </Button>
              )}

              {props.api.isPaused() && (
                <Button
                  variant="outline"
                  borderColor="black"
                  onClick={() => handlePause(props.api)}
                >
                  Resume
                </Button>
              )}
            </Box>
            {showProgress && (
              <Progress
                height="32px"
                marginTop="2rem"
                background="orange.100"
                colorScheme="orange"
                isAnimated={true}
                value={sec - props.seconds}
                max={sec}
              />
            )}
          </>
        );
      }}
    />
  );
};
