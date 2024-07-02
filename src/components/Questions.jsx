import React, { useState } from "react";
import "./Questions.css";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [catQues, setCatQues] = useState(null);

  async function fetchQuestions() {
    try {
      const response = await fetch("https://the-trivia-api.com/v2/questions");
      const data = await response.json();
      if (data) {
        console.log(data);
        setQuestions(data);
      }
    } catch (error) {
      console.error("error receiving questions", error);
    }
  }

  function displayCategoryQues(id) {
    const selectedQues = questions.find((question) => question.id === id);
    if (selectedQues) {
      // Combine correct and incorrect answers
      const allAnswers = [
        ...selectedQues.incorrectAnswers,
        selectedQues.correctAnswer,
      ];
      // Shuffle the answers array
      const shuffledAnswers = shuffleArray(allAnswers);
      // Add the shuffled answers to the selected question
      setCatQues({ ...selectedQues, shuffledAnswers });
    }
  }

  // Function to shuffle an array
  function shuffleArray(array) {
    if (!Array.isArray(array)) {
      console.error("shuffleArray: array is not an array");
      return [];
    }
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div>
      <button onClick={fetchQuestions}>Generate Question</button>
      <br />
      <br />
      <div>
        {questions.map((ques) => (
          <label key={ques.id} className="category-lists">
            <button onClick={() => displayCategoryQues(ques.id)}>
              {ques.category}
            </button>
            {catQues && catQues.id === ques.id ? (
              <div>
                <p>{catQues.question.text}</p>
                {catQues.shuffledAnswers.map((answer, index) => (
                  <p key={index}>
                    <input
                      type="radio"
                      name={`question-${ques.id}`}
                      value={answer}
                    />
                    <label>{answer}</label>
                  </p>
                ))}
              </div>
            ) : null}
            <br />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Questions;
