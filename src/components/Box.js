import styled from "styled-components";
import { space, layout, color, flexbox, typography } from "styled-system";

export const Box = styled("div")(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  typography,
  layout,
  space,
  color,
  flexbox
);
