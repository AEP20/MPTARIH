import React, {useEffect, useState} from 'react'
import "../Css/QuestionsDetails.css"

function QuestionsDetails() {

    //fetch the count of every questions as the thema name
    const [count, setCount] = useState([]);

    
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/miniQuiz/count");
                const data = await response.json();
                
                const counts = data.questionCounts.map(item => item.count);
                console.log("counts", counts)
                setCount(counts);

            } catch (error) {
                console.log(error);
            }
        };
        fetchQuestions();
    }, []);

    

  return (
    <div className='questions-details'>
        <table>
            <tr>
                <th>Konu</th>
                <th>Soru Sayısı</th>
            </tr>
            <tr>
                <td>İslamiyet Öncesi Türk Tarihi</td>
                {count && <td>{count[0]}</td>}
            </tr>
            <tr>
                <td>İslamiyet Dönemi Türk Tarihi</td>
                {count && <td>{count[1]}</td>}
            </tr>
            <tr>
                <td>Osmanlı Devleti</td>
                {count && <td>{count[2]}</td>}
            </tr>
        </table>    
    </div>
  )
}

export default QuestionsDetails