import React from "react";
import "./fonts/font.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { StiProvider } from "./contexts";
import { CalendarBox } from "./components/CalendarBox";

function App() {
  return (
    <StiProvider>
      <BrowserRouter basename="/react-decorate-with-stickers">
        <GlobalStyles />

        <Routes>
          <Route path="/" element={<CalendarBox />} />
        </Routes>
      </BrowserRouter>
    </StiProvider>
  );
}

export default App;
