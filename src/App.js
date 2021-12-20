import React from "react";
import "./fonts/font.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { StiProvider } from "./contexts";
import { CalendarBox } from "./components/CalendarBox";

function App() {
  return (
    <StiProvider>
      <BrowserRouter basename="/react-decorate-with-stickers">
        <GlobalStyles />
        <CalendarBox />
      </BrowserRouter>
    </StiProvider>
  );
}

export default App;
