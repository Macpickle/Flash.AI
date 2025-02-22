import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlashCard from "@/components/app-flashcard";
import { useLocation } from "react-router-dom";
import AxiosRequest from "@/utils/Axios";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const location = useLocation();

  const submitAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } 
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  // fetch questions on mount
  useEffect(() => {
    if (location.state) {
      const { id } = location.state;
      AxiosRequest({
        url: `/api/docs/${id}`,
        method: "GET",
        data: {},
      }).then((response) => {
        setQuestions(response.data.flashCards || []);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [location.state]);


  return (
    <div className="flex flex-col items-center justify-center h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {questions.length > 0 && (
          <motion.div
            key={currentQuestion}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            { currentQuestion < questions.length ? (
              <FlashCard
                question={questions[currentQuestion]}
                index={currentQuestion+1}
                total={questions.length}
                submitAnswer={(isCorrect) => submitAnswer(isCorrect)}
                nextQuestion={nextQuestion}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-3xl font-bold text-center leading-tight">
                  Quiz Completed
                  <p>{correctAnswers}</p>
                </h2>
              </div>
            )

            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
