import { useEffect, useState } from "react";
import "../Css/FetchMiniQuiz.css"

function FetchMiniQuiz() {
  const [questions, setQuestions] = useState([]);

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/api/miniQuiz/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/miniQuiz");
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="question-container">
      <h1>Mini Quiz</h1>
      <div className="question-sub-container">
        {questions.map((question) => (
          <div key={question._id}>
            <h3>{question.question}</h3>
            <p>{question.answerA}</p>
            <p>{question.answerB}</p>
            <p>{question.answerC}</p>
            <p>{question.answerD}</p>
            <p>{question.correctAnswer}</p>
            <p>{question.thema}</p>
            <button onClick={() => handleDelete(question._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchMiniQuiz;
