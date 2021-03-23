import React from "react";
import { Box, Button } from "@chakra-ui/react";

export const Counter = (props) => {
  const { handleIncrement, handleDecrement } = props;

  return (
    <Box
      m="1.5rem 0"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      color="white"
    >
      <Button
        size="sm"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        className="disable-dbl-tap-zoom"
        variant="outline"
        onClick={handleDecrement}
      >
        Less
      </Button>

      <Box fontWeight="bold">{props.children}</Box>

      <Button
        size="sm"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        className="disable-dbl-tap-zoom"
        variant="outline"
        onClick={handleIncrement}
      >
        More
      </Button>
    </Box>
  );
};
