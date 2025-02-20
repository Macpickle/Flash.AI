import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from "lucide-react";
import PropTypes from "prop-types";

const FlashCard = ({ question, onAnswer, isAnswered, onNext, isLast }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswer();
  };

  const getButtonStyles = (answer) => {
    if (!isAnswered) {
      return "w-full py-6 bg-neutral-500 hover:bg-neutral-600 text-white text-lg rounded-2xl transition-none";
    }

    if (answer === question.correctAnswer) {
      return "w-full py-6 bg-green-500 text-white text-lg rounded-2xl transition-none";
    }

    if (answer === selectedAnswer && answer !== question.correctAnswer) {
      return "w-full py-6 bg-red-500 text-white text-lg rounded-2xl transition-none";
    }

    return "w-full py-6 bg-neutral-500 text-white text-lg rounded-2xl transition-none";
  };

  return (
    <div className="w-full max-w-md aspect-[2/3] mx-auto relative">
      {/* Front side of card */}
      <div
        style={{
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(90deg)" : "rotateY(0deg)",
          position: isFlipped ? "absolute" : "relative",
          visibility: isFlipped ? "hidden" : "visible",
          width: "100%",
          height: "100%",
        }}
      >
        <Card className="w-full h-full bg-background text-foreground border-2 border-neutral-500 rounded-3xl overflow-hidden shadow-lg flex flex-col">
          <CardContent className="h-full flex flex-col p-0">
            {/* Top section with close button */}
            <div className="p-4 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-neutral-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Question section */}
            <div className="px-6 flex-grow flex items-center justify-center">
              <h2 className="text-3xl font-bold text-center leading-tight">
                {question.question}
              </h2>
            </div>

            {/* Answer section - fixed height */}
            <div className="p-6 space-y-3 mt-auto">
              {question.answers.map((answer) => (
                <Button
                  key={answer}
                  className={getButtonStyles(answer)}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={isAnswered}
                >
                  {answer}
                </Button>
              ))}

              {/* Next and Flip buttons container with fixed height */}
              <div
                className={`h-24 flex flex-col ${isAnswered ? "justify-between" : "justify-end"}`}
              >
                {isAnswered && (
                  <Button
                    className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-2xl transition-opacity duration-300"
                    onClick={onNext}
                  >
                    {isLast ? "Finish" : "Next"}
                  </Button>
                )}

                {isAnswered && (
                  <Button
                    className="w-full py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-2xl mt-2"
                    onClick={() => setIsFlipped(true)}
                  >
                    <span className="mr-2">Flip to see explanation</span>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back side of card */}
      <div
        style={{
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(0deg)" : "rotateY(-90deg)",
          position: isFlipped ? "relative" : "absolute",
          visibility: isFlipped ? "visible" : "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <Card className="w-full h-full bg-background text-foreground border-2 border-neutral-500 rounded-3xl overflow-hidden shadow-lg flex flex-col">
          <CardContent className="h-full flex flex-col p-0">
            {/* Top section with close button */}
            <div className="p-4 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-neutral-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Answer explanation section - with flex-grow to fill space */}
            <div className="px-6 py-4 flex-grow flex flex-col items-center justify-center overflow-auto">
              <h2 className="text-2xl font-bold text-center mb-4">
                Correct Answer:
              </h2>
              <div className="text-3xl font-bold text-green-500 text-center mb-6">
                {question.correctAnswer}
              </div>

              {question.explanation && (
                <>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Explanation:
                  </h3>
                  <p className="text-center text-lg">
                    {question.explanation || "No explanation provided."}
                  </p>
                </>
              )}
            </div>

            {/* Back button container with fixed height to match front */}
            <div className="p-6 mt-auto">
              <Button
                className="w-full py-3 bg-gray-700 hover:bg-gray-800 text-white text-lg rounded-2xl"
                onClick={() => setIsFlipped(false)}
              >
                <span className="mr-2">Back to Question</span>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

FlashCard.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string,
    explanation: PropTypes.string,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
};


export default FlashCard;
