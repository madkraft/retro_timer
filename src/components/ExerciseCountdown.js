import React, { useState } from "react";
import Countdown from "react-countdown";
import { speak } from "../utils/speak";
import { Box } from "./Box";
import styled from "styled-components";
import doggo from "../doggo.png";

const CountdownContainer = styled(Box)`
  position: fixed;
  left: 50px;
  top: 20px;
  z-index: 1;
`;

const Doggo = styled.img`
  position: absolute;
  top: 130px;
  left: -70px;
  height: 110px;
  width: 110px;
`;

export const ExerciseCountdown = (props) => {
  const { countDownTime, onComplete, startMessage } = props;
  const [message, setMessage] = useState();

  const getMessage = (seconds) => {
    return `Start in ${seconds}`;
  };

  return (
    <Countdown
      date={countDownTime}
      onStart={() => {
        speak(startMessage);
      }}
      onComplete={() => {
        setMessage("Go go go!");
        onComplete();
      }}
      renderer={({ seconds }) => {
        return (
          <CountdownContainer fontSize="3rem">
            <Doggo src={doggo} alt="doggo" />
            <div className="nes-balloon from-left">
              <p>{message ?? getMessage(seconds)}</p>
            </div>
          </CountdownContainer>
        );
      }}
    />
  );
};
