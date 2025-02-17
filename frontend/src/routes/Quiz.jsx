// quiz.jsx
import { useState } from "react";
import SideNav from "@/components/app-sidenav";
import FlashCard from "@/components/app-flashcard";

const sampleQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal?",
    answers: ["African Elephant", "Blue Whale", "Giraffe", "White Rhinoceros"],
    correctAnswer: "Blue Whale",
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnswered(false);
        setIsExiting(false);
      }, 300);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-x-hidden">
      <SideNav />
      <main className="flex-1 overflow-hidden bg-black">
        <div
          className={`w-full h-full flex items-center justify-center transition-transform duration-300 ${isExiting ? "-translate-y-full" : "translate-y-0"}`}
        >
          <FlashCard
            question={sampleQuestions[currentQuestionIndex]}
            onAnswer={() => setIsAnswered(true)}
            isAnswered={isAnswered}
            onNext={handleNext}
            isLast={currentQuestionIndex === sampleQuestions.length - 1}
          />
        </div>
      </main>
    </div>
  );
}
