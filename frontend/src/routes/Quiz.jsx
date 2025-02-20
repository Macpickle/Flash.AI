import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlashCard from "@/components/app-flashcard";
import ProgressBar from "@/components/app-progressbar";

const sampleQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Because of the People in Paris.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    explanation:
      "Mars is known as the Red Planet because of its reddish color.",
  },
  {
    id: 3,
    question: "What is the largest mammal?",
    answers: ["African Elephant", "Blue Whale", "Giraffe", "White Rhinoceros"],
    correctAnswer: "Blue Whale",
    explanation: "Blue Whale is the largest mammal.",
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % sampleQuestions.length);
    setIsAnswered(false);
  };

  return (
    <div className="flex w-screen h-screen overflow-x-hidden">
      <main className="flex-1 flex flex-col items-center justify-center relative bg-neutral-300 dark:bg-black overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <FlashCard
              question={sampleQuestions[currentQuestionIndex]}
              onAnswer={() => setIsAnswered(true)}
              isAnswered={isAnswered}
              onNext={handleNext}
              isLast={currentQuestionIndex === sampleQuestions.length - 1}
            />
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar Below the Card */}
        <div className="bottom-5 absolute w-3/4">
          <ProgressBar
            total={sampleQuestions.length}
            current={currentQuestionIndex + 1}
          />
        </div>
      </main>
    </div>
  );
}
