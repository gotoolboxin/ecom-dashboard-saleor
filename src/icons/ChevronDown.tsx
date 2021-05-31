import { useTheme } from "@saleor/macaw-ui";
import React from "react";

const ChevronDown: React.FC = () => {
  const { themeType } = useTheme();

  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke={themeType === "dark" ? "#FAFAFA" : "#28234A"}
        stroke-opacity="0.4"
        stroke-width="2"
      />
    </svg>
  );
};

export default ChevronDown;
