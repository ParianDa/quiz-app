import React, { useState } from "react";
import "./Questions.css";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [catQues, setCatQues] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

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
      setSelectedAnswer("");
      setIsCorrect(null);
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

  function checkAnswer() {
    if(catQues && selectedAnswer) {
      const result = catQues.correctAnswer === selectedAnswer;
      setIsCorrect(result)
      console.log(result ? "true" : "false")
    }
  }

  function handleSelectedanswers(event) {
    setSelectedAnswer(event.target.value)
  }

  return (
    <div className="container">
      <button onClick={fetchQuestions}>Generate Question</button>
      <br />
      <br />
      <div className="category-container">
        {questions.map((ques) => (
          <button onClick={() => displayCategoryQues(ques.id)}>
            {ques.category}
          </button>
        ))}
      </div>
      {catQues && (
        <div className="questions-container">
          <p>{catQues.question.text}</p>
          {catQues.shuffledAnswers.map((answer, index) => (
            <div key={index}>
              <p>
                <input
                  type="radio"
                  name={`question-${catQues.id}`}
                  value={answer}
                  // first the selectAnswer state is checked with the answer, wihtout clicking checked == false, thus radio is resetted
                  checked={selectedAnswer === answer}
                  onChange={handleSelectedanswers}
                />
                <label>{answer}</label>
              </p> 
            </div>
          ))}
          <button onClick={checkAnswer}>Check Answer</button>
          {isCorrect !== null && (
            <div className={`banner ${isCorrect ? "correct" : "incorrect"}`}>
              {isCorrect ? "Correct!" : "Incorrect!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
