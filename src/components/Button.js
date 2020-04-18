import styled from "styled-components";
import { space, layout, color, flexbox } from "styled-system";

export const Button = styled("button")(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  layout,
  space,
  color,
  flexbox
);
