import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlashCard from "@/components/app-flashcard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AxiosRequest from "@/utils/Axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswers, setShowAnswers] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const submitAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentQuestion]);
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
      })
        .then((response) => {
          setQuestions(response.data.flashCards || []);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.state]);

  const toggleAnswer = (index) => {
    setShowAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
            {currentQuestion < questions.length ? (
              <FlashCard
                question={questions[currentQuestion]}
                index={currentQuestion + 1}
                total={questions.length}
                submitAnswer={(isCorrect) => submitAnswer(isCorrect)}
                nextQuestion={nextQuestion}
              />
            ) : (
              <div className="flex items-center justify-center h-screen flex-col">
                <Card className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <CardHeader className="text-center text-4xl">
                    Quiz complete!
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="animate-reveal delay-1s">
                      You scored {correctAnswers} out of {questions.length}
                    </p>
                    <Card className="mt-4 p-4 max-h-64 overflow-y-auto bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <CardHeader className="text-center text-2xl">
                        Incorrect Answers
                      </CardHeader>
                      <CardContent>
                        <Tooltip id="correct" />
                        {incorrectAnswers.map((index) => (
                          <div
                            key={index}
                            className="flex flex-col items-start p-2 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl gap-3 mt-2"
                            data-tooltip-id="correct"
                            data-tooltip-content="Click to reveal the correct answer"
                          >
                            <span
                              className="break-words max-w-96 cursor-pointer"
                              onClick={() => toggleAnswer(index)}
                            >
                              {questions[index].question}
                            </span>
                            {showAnswers[index] && (
                              <span className="break-words max-w-96 text-center w-full">
                                {console.log(questions[index])}
                                {questions[index].multipleChoice.options.map(
                                  (option, i) =>
                                    option.isCorrect && (
                                      <span key={i} className="text-green-400">
                                        {" "}
                                        {option.text}{" "}
                                      </span>
                                    ),
                                )}
                              </span>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setCorrectAnswers(0);
                      }}
                      className="mt-4 w-full"
                    >
                      Restart Quiz
                    </Button>
                    <Button
                      onClick={() => navigate("/dashboard")}
                      className="mt-4 w-full"
                    >
                      Go back
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
