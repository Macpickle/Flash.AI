import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import ProgressBar from "@/components/app-progressbar";
import { FaStar } from "react-icons/fa";

const FlashCard = ({ question, submitAnswer, index, total, nextQuestion }) => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const selectAnswer = (isCorrect, index) => {
    submitAnswer(isCorrect);
    setSelectedAnswer(true);

    const options = document.querySelectorAll("#question-options > div");
    options.forEach((option, i) => {
      option.style.pointerEvents = "none"; // disable click events

      if (isCorrect) {
        if (i === index) {
          option.classList.add("bg-green-100", "border-green-400", "dark:bg-green-500", "dark:border-green-600");
        }
      } else {
        if (i === index) {
          option.classList.add("bg-red-300", "border-red-400", "dark:bg-red-500", "dark:border-red-600");
        }
        if (question.multipleChoice.options[i].isCorrect) {
          option.classList.add("bg-green-100", "border-green-400", "dark:bg-green-500", "dark:border-green-600");
        }
      }
    });
  };

  const getHint = () => {
    const options = document.querySelectorAll("#question-options > div");
    if (hintUsed) return;
    if (selectedAnswer) return;

    // randomly turn option yellow, that is NOT the answer
    let randomIndex = Math.floor(Math.random() * question.multipleChoice.options.length);
    while (question.multipleChoice.options[randomIndex].isCorrect) {
      randomIndex = Math.floor(Math.random() * question.multipleChoice.options.length);
    }

    options.forEach((option, i) => {
      if (i === randomIndex) {
        option.style.pointerEvents = "none"; // disable click events
        setHintUsed(true); // disable hint button, extra safety
        option.classList.add("bg-yellow-100", "border-yellow-400", "dark:bg-yellow-500", "dark:border-yellow-600");
      } 
    });
  };

  // randomize options only when mounted
  useEffect(() => {
    const options = question.multipleChoice.options;
    const shuffled = options.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, [question]);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Card className="p-4 bg-neutral-100 relative dark:bg-neutral-900">
        <Tooltip id="close" />
        <Button
          variant="icon"
          data-tooltip-id="close"
          data-tooltip-content="Close"
          onClick={() => navigate("/dashboard")}
          className="absolute top-2 right-2 hover:text-neutral-600 hover:transform hover:scale-150 transition-transform duration-300 ease-in-out"
        >
          <X />
        </Button>
        <CardContent className="p-0">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-center">
              <h1 className="text-3xl font-bold">Question {index}</h1>
            </div>
          </CardHeader>
          <div className="flex items-center justify-center mb-2 p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl min-h-24 mb-2 max-w-md flex-col relative">
            <h1 className="text-center text-2xl">{question.question}</h1>

            <Tooltip id = "difficulty" />
            <div 
              className="flex items-center justify-center absolute -bottom-3"
              data-tooltip-id="difficulty"
              data-tooltip-content={`Difficulty: ${question.difficulty}/3`}
            >
              {[...Array(question.difficulty)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 mx-1 text-2xl" />
              ))}
              {[...Array(3 - question.difficulty)].map((_, i) => (
                <FaStar key={i} className="text-gray-400 mx-1 text-2xl" />
              ))}
            </div>
          </div>

          <p className="text-sm text-center mt-4">Select the correct answer</p>
          <div className="flex flex-col gap-2" id="question-options">
            {
              questions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl cursor-pointer gap-3"
                  onClick={() => selectAnswer(option.isCorrect, index)}
                >
                  <span className="flex items-center justify-center bg-neutral-200 w-6 h-6 rounded-full border border-neutral-400 dark:text-black">{alphabet[index]}</span>
                  <span className="break-words max-w-96">
                    {option.text}
                  </span>
                </div>
              ))
            }
          </div>
          <div className="flex items-center justify-end mt-4">
            <Tooltip id="hint" place="top" />
            <Button
              variant="ghost"
              data-tooltip-id="hint"
              data-tooltip-content="Get a hint"
              onClick={getHint}
              className={`hover:text-primary ${hintUsed ? 'text-gray-400 cursor-not-allowed' : ''}`}
              id="hint"
              disabled={hintUsed}
            >
              Hint
            </Button>

            <Tooltip id="skip" place="top" />
            <Button
              variant="ghost"
              data-tooltip-id="skip"
              data-tooltip-content="Skip question"
              onClick={nextQuestion}
              className="hover:text-primary"
            >
              Skip
            </Button>
          </div>

          <div className = "min-h-12">
            {selectedAnswer && (
              <div className="flex items-center justify-center mt-4">
                <Button
                  className="w-full"
                  onClick={nextQuestion}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <Tooltip id="progress" place="bottom"/>
        <div 
          className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-xl" 
          data-tooltip-id="progress"
          data-tooltip-content={`Question ${index} of ${total}`}
        >
          <ProgressBar
            total={total}
            current={index}
          />
        </div>
      </Card>
    </div>
  );
};

FlashCard.propTypes = {
  question: PropTypes.object.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default FlashCard;
