import { BrowserRouter, Routes, Route } from "react-router-dom";
import MiniQuiz from "./components/NewQuestionMiniQuiz";
import MainPage from "./components/MainPage";
import React from "react";
import Navbar from "./components/Navbar";
import FetchMiniQuiz from "./components/FetchMiniQuiz";
import QuestionsDetails from "./components/QuestionsDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/miniQuiz/newQuestion" element={<MiniQuiz />} />
        <Route path="/miniQuiz/fetchQuestions" element={<FetchMiniQuiz />} />
        <Route path="/miniQuiz/questionsDetails" element={<QuestionsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
