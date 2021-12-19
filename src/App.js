import React from "react";
import "./fonts/font.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { StiProvider } from "./contexts";
import { CalendarBox } from "./components/CalendarBox";

function App() {
  return (
    <BrowserRouter basename="/react-decorate-with-stickers">
      <StiProvider>
        <GlobalStyles />
        <CalendarBox />
      </StiProvider>
    </BrowserRouter>
  );
}

export default App;
