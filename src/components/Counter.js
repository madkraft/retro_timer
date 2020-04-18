import React from "react";
import { Box } from "./Box";

export const Counter = (props) => {
  const { handleIncrement, handleDecrement } = props;

  return (
    <Box m="1.5rem 0" display="flex" justifyContent="space-between" alignItems="center">
      <button type="button" className="nes-btn is-warning disable-dbl-tap-zoom" onClick={handleDecrement}>
        Less
      </button>

      <Box m="0 1rem">{props.children}</Box>

      <button type="button" className="nes-btn is-primary disable-dbl-tap-zoom" onClick={handleIncrement}>
        More
      </button>
    </Box>
  );
};
