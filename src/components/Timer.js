import React from "react";
import Countdown from "react-countdown";
import milliseconds from "milliseconds";
import { Box, Button } from "@chakra-ui/react";

export const Timer = (props) => {
  const { sec = 0, onComplete, onTick, reset } = props;
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
            <Box display="flex" justifyContent="space-evenly" marginTop="2rem">
              <Button
                variant="outline"
                borderColor="black"
                height="4rem"
                minWidth="30%"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                onClick={reset}
              >
                Reset
              </Button>

              {!props.api.isPaused() && (
                <Button
                  variant="outline"
                  borderColor="black"
                  height="4rem"
                  minWidth="30%"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  onClick={() => handlePause(props.api)}
                >
                  Stop
                </Button>
              )}

              {props.api.isPaused() && (
                <Button
                  variant="outline"
                  borderColor="black"
                  height="4rem"
                  minWidth="30%"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  onClick={() => handlePause(props.api)}
                >
                  Resume
                </Button>
              )}
            </Box>
          </>
        );
      }}
    />
  );
};
