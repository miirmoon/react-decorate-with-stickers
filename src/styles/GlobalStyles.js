import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    font-family: "GowunDodum-Regular";
  }
  html, body {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #A9BAC5;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-track {
    background-color: #ECF0F2;
    border-radius: 2px;
  }
`;
