import React from 'react'
import { useNavigate } from "react-router-dom";
import MiniQuiz from './NewQuestionMiniQuiz';

function MainPage() {

    const navigate = useNavigate();

    function addNewQuestion(){
        navigate("/miniQuiz/newQuestion");
    }

    function fetchQuestions(){
        navigate("/miniQuiz/fetchQuestions");
    }

    function QuestionsDetails(){
        navigate("/miniQuiz/questionsDetails");
    }




  return (
    <div>
        <h1>Admin Panel</h1>
        
        <div>
            <h2>Mini Quiz</h2>
            <button onClick={addNewQuestion}>Soru Ekle</button>
            <button onClick={fetchQuestions}>Soruları görüntüle</button>
            <button onClick={QuestionsDetails}>Soruların detayları</button>
        </div>

        <div>
            <h2>Bilgi Kartları</h2>
            <button>Kart Ekle</button>
            <button>Kartları görüntüle</button>
        </div>
        
    </div>
  )
}

export default MainPage