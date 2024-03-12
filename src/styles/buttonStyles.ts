import colors from "@/value/colors";
import { css } from "@emotion/react";

const buttonStyles = ({
  size = "medium",
}: {
  size?: "medium" | "large";
}) => css`
  color: ${colors.white};
  padding: ${size === "medium" ? "0.5rem 1rem" : "1.5rem"};
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${size === "medium" ? "1rem" : "1.5rem"};
  font-weight: bold;
  height: ${size === "medium" ? "3rem" : "4.5rem"};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: transparent;
  }
`;

export default buttonStyles;
