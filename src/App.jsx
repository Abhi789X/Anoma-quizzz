import React, { useState } from 'react';
import questions from './questions';

const getRandomQuestions = () =>
  [...questions].sort(() => 0.5 - Math.random()).slice(0, 5);

const getMessage = (score) => {
  if (score <= 2) return "Lurk more, anon 🫠";
  if (score <= 4) return "You're Anoma aware 🧠";
  return "You’re a true Anoma Mage 🧙";
};

export default function App() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [randomQs, setRandomQs] = useState([]);

  const startQuiz = () => {
    setRandomQs(getRandomQuestions());
    setStarted(true);
  };

  const handleAnswer = (option) => {
    if (option === randomQs[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ + 1 < 5) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-darkred text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Anoma Quiz</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 rounded bg-blood text-white mb-4"
        />
        <button
          onClick={startQuiz}
          disabled={!name}
          className="bg-blood px-4 py-2 rounded hover:bg-red-800"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-darkred text-white">
        <h2 className="text-2xl mb-2">Hey {name}, your score is {score}/5</h2>
        <p className="mb-6">{getMessage(score)}</p>
        <button
          onClick={restart}
          className="bg-blood px-4 py-2 rounded hover:bg-red-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-darkred text-white px-4 text-center">
      <h2 className="text-2xl mb-4">
        Question {currentQ + 1}/5
      </h2>
      <p className="mb-4 text-lg font-medium">{randomQs[currentQ].question}</p>
      <div className="flex flex-col gap-3">
        {randomQs[currentQ].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="bg-blood px-4 py-2 rounded hover:bg-red-800"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
