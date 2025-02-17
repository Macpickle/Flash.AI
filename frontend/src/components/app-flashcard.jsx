import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

const FlashCard = ({ question, onAnswer, isAnswered, onNext, isLast }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswer();
  };

  const getButtonStyles = (answer) => {
    if (!isAnswered) {
      return "w-full py-6 bg-yellow-700 hover:bg-yellow-700 text-white text-lg rounded-2xl transition-colors duration-300";
    }

    if (answer === question.correctAnswer) {
      return "w-full py-6 bg-green-500 text-white text-lg rounded-2xl transition-colors duration-300";
    }

    if (answer === selectedAnswer && answer !== question.correctAnswer) {
      return "w-full py-6 bg-red-500 text-white text-lg rounded-2xl transition-colors duration-300";
    }

    return "w-full py-6 bg-neutral-600 text-white text-lg rounded-2xl transition-colors duration-300";
  };

  return (
    <Card className="w-full max-w-md aspect-[1/2] bg-neutral-500 dark:bg-neutral-900 text-white border-2 border-yellow-500 rounded-3xl overflow-hidden mx-4 shadow-lg">
      <CardContent className="h-full flex flex-col">
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

        {/* Answer section */}
        <div className="p-6 space-y-3">
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

          {/* Next button */}
          <div className="h-16">
            {isAnswered && (
              <Button
                className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-2xl transition-opacity duration-300"
                onClick={onNext}
              >
                {isLast ? "Finish" : "Next"}
              </Button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-6">
          <Progress value={(question.id / 3) * 100} className="w-full h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FlashCard;
