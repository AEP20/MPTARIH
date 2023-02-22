import { useEffect, useState } from "react";
import "../Css/FetchMiniQuiz.css";
import Combobox from "react-widgets/Combobox";

function FetchMiniQuiz() {
  const [thema, setThema] = useState("Konu1");

  const options = [
    "Konu1",
    "Konu2",
    "Konu3",
    "Konu4",
    "Konu5",
    "Konu6",
    "Konu7",
    "Konu8",
    "Konu9",
    "Konu10",
    "Konu11",
    "Konu12",
    "Konu13",
    "Konu14",
    "Konu15",
  ];

  const handleSelect = (value) => {
    console.log("change");
    setThema(value);
  };

  const handleIsPremiumChange = (id, value) => {
    fetch(`http://192.168.1.34:4000/api/miniQuiz/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isPremium: value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setQuestions((prevQuestions) => {
            return prevQuestions.map((question) => {
              if (question._id === id) {
                return {
                  ...question,
                  isPremium: value,
                };
              } else {
                return question;
              }
            });
          });
        } else {
          console.error('Failed to update question');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [questions, setQuestions] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.1.34:4000/api/miniQuiz/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    console.log("thema", thema);
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.34:4000/api/miniQuiz?thema=${thema}`
        );
        const data = await response.json();
        setQuestions(data.questions);
        console.log(data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [thema]);

  return (
    <div className="question-container">
      <Combobox
        data={options}
        value={thema}
        onChange={handleSelect}
        style={{
          width: 200,
          height: 30,
          position: "absolute",
          top: 50,
          right: 200,
        }}
      />

      <h1>Mini Quiz</h1>
      <div className="question-sub-container">
        {questions.map((question) => (
          <div key={question._id}>
            <h3 style={{ fontSize: 12 }}>{question.question}</h3>
            <p style={{ fontSize: 12 }}>{question.answerA}</p>
            <p style={{ fontSize: 12 }}>{question.answerB}</p>
            <p style={{ fontSize: 12 }}>{question.answerC}</p>
            <p style={{ fontSize: 12 }}>{question.answerD}</p>
            <p style={{ fontSize: 12 }}>{question.correctAnswer}</p>
            <p style={{ fontSize: 12 }}>{question.thema}</p>
            <button onClick={() => handleDelete(question._id)}>Delete</button>
            <label>
              <input
                type="radio"
                name={`isPremium-${question._id}`}
                value="true"
                checked={question.isPremium === true}
                onChange={() => handleIsPremiumChange(question._id, true)}
              />
              Premium
            </label>
            <label>
              <input
                type="radio"
                name={`isPremium-${question._id}`}
                value="false"
                checked={question.isPremium === false}
                onChange={() => handleIsPremiumChange(question._id, false)}
              />
              Free
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchMiniQuiz;
