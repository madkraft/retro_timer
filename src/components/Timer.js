import React from "react";
import Countdown from "react-countdown";
import milliseconds from "milliseconds";
import { Box } from "./Box";

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
            <Box fontSize="5rem" margin="1rem 0">
              {props.formatted.minutes}:{props.formatted.seconds}
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop="2rem">
              <button type="button" className="nes-btn" onClick={reset}>
                Reset
              </button>

              {!props.api.isPaused() && (
                <button type="button" className="nes-btn is-error" onClick={() => handlePause(props.api)}>
                  Stop
                </button>
              )}

              {props.api.isPaused() && (
                <button type="button" className="nes-btn is-success" onClick={() => handlePause(props.api)}>
                  Resume
                </button>
              )}
            </Box>
          </>
        );
      }}
    />
  );
};
