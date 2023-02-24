import React,{useState} from "react";
import "./MiniQuiz.css";
import newQuestion from "../Services/newQuestion";

function MiniQuiz() {
    const [question, setQuestion] = useState("");
    const [answerA, setAnswerA] = useState("");
    const [answerB, setAnswerB] = useState("");
    const [answerC, setAnswerC] = useState("");
    const [answerD, setAnswerD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [thema, setThema] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (question === "") {
            alert("Lütfen soruyu giriniz.");
            return;
        }
        if (answerA === "") {
            alert("Lütfen cevap A'yı giriniz.");
            return;
        }
        if (answerB === "") {
            alert("Lütfen cevap B'yı giriniz.");
            return;
        }
        if (answerC === "") {
            alert("Lütfen cevap C'yı giriniz.");
            return;
        }
        if (answerD === "") {
            alert("Lütfen cevap D'yı giriniz.");
            return;
        }
        if (correctAnswer === "") {
            alert("Lütfen doğru cevabı seçiniz.");
            return;
        }
        if (thema === "") {
            alert("Lütfen sorunun konusunu seçiniz.");
            return;
        }

        const newQuestion = {
            question,
            answerA,
            answerB,
            answerC,
            answerD,
            correctAnswer,
            thema,
        };

        const res = await fetch ("http://localhost:4000/api/miniQuiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion),
        });
        
        if (!res.ok) {
            alert("Soru eklenemedi.");
            return;
        }

        if (res.ok) {
            alert("Soru eklendi.");
            setAnswerA("");
            setAnswerB("");
            setAnswerC("");
            setAnswerD("");
            setCorrectAnswer("");
            setQuestion("");
            setThema("");
            return;
        }


    }
    
    


  return (
    <div className="MiniQuiz">
        <h1>MiniQuiz</h1>
        <form onSubmit={handleSubmit}>
            <div className="question">
                <label>
                    Soru:
                    <textarea type="text" name="name" value={question} onChange={(e) => setQuestion(e.target.value)} />
                </label>
            </div>
            
            <div className="answer">
                <label>
                    Cevap A:
                    <input type="text" name="name" value={answerA} onChange={(e) => setAnswerA(e.target.value)} />
                </label>

                <label>
                    Cevap B:
                    <input type="text" name="name" value={answerB} onChange={(e) => setAnswerB(e.target.value)} />
                </label>

                <label>
                    Cevap C:
                    <input type="text" name="name" value={answerC} onChange={(e) => setAnswerC(e.target.value)} />
                </label>

                <label>
                    Cevap D:
                    <input type="text" name="name" value={answerD} onChange={(e) => setAnswerD(e.target.value)} />
                </label>

                <label id="selectionlabel">
                    Doğru Cevap:
                    <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                        <option value="">Seçiniz</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </label>

                <label>
                    Konu:
                    <select value={thema} onChange={(e) => setThema(e.target.value)}>
                        <option value="">Seçiniz</option>
                        <option value="Konu12">Konu12</option>
                    </select>
                </label>

            <button type="submit">Soru Ekle</button>

            </div>

        </form>
    </div>

  );
}

export default MiniQuiz;
