import React, { useEffect, useState } from "react";
import "../Css/QuestionsDetails.css";

function QuestionsDetails() {
  const [count, setCount] = useState([]);
  const [premium, setPremium] = useState([]);
  const [free, setFree] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.34:4000/api/miniQuiz/count"
      );
      const data = await response.json();

      setCount(data.questionCounts);
      console.log("counts", count);
    } catch (error) {
      console.log(error);
    }
  };

  const freeAndPremiumQuestions = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.34:4000/api/miniQuiz/detailedCount"
      );
      const data = await response.json();
      setPremium(data.premiumQuestions);
      setFree(data.freeQuestions);

      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    freeAndPremiumQuestions();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Theme</th>
          <th>All Questions</th>
          <th>Free Questions</th>
          <th>Premium Questions</th>
        </tr>
      </thead>
      <tbody>
        {count.map((theme) => (
          <tr key={theme._id}>
            <td>{theme._id}</td>
            <td>{theme.count}</td>
            <td>{free.find((t) => t._id === theme._id)?.count || 0}</td>
            <td>{premium.find((t) => t._id === theme._id)?.count || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default QuestionsDetails;
