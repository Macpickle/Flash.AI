import { CiStar } from "react-icons/ci";
import { Tooltip } from "react-tooltip";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FlashCard({ question, multipleChoice, submitAnswer, difficulty, currentQuestion, totalQuestions, continueQuiz }) {
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate();
    
    const submit = () => {
        const answer = document.querySelector('input[name="quiz"]:checked').value;
        const radios = document.querySelectorAll('input[name="quiz"]');
        radios.forEach(radio => {
            radio.onclick = (e) => e.preventDefault();
        });

        setSelected(true);
        submitAnswer(answer);
    };

    useEffect(() => {
        setSelected(false);

        // randomize options
        const options = [...multipleChoice.options];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        multipleChoice.options = options;
    }, [question]);

    return (
        <div className="border p-4 w-100 text-center" style={{ maxWidth: '600px', height: '90%' }}>
            <div className="d-flex justify-content-end align-items-center w-100">
                <IoMdClose
                    size={24}
                    className="icon"
                    data-tooltip-id="close-tooltip"
                    onClick={() => navigate('/home')}
                />
                <Tooltip id="close-tooltip" place="bottom" effect="solid">
                    Close
                </Tooltip>
            </div>
            <h2 className="title">Question</h2>
            
            <div className="d-flex justify-content-center align-items-center" data-tooltip-id="difficulty-tooltip">
                {[...Array(3)].map((_, index) => (
                    <CiStar key={index} size={24} color={index < difficulty ?  '#FFA07A' : 'lightgray'} />
                ))}
            </div>
            <Tooltip id="difficulty-tooltip" place="bottom" effect="solid">
                Difficulty Level {difficulty}
            </Tooltip>
            <p className="text">{question}</p>
            <div className="d-flex justify-content-start align-items-start flex-column">
                {multipleChoice.options.map((option, index) => (
                    <div
                        key={option._id}
                        className="form-check border text-left d-flex align-items-center m-0 mb-3 w-100"
                        id="questionoutline"
                        htmlFor={`answer${index}`}
                        onClick={() => {
                            document.getElementById(`answer${index}`).click();
                            if (!selected) {
                                submit();
                            }
                        }}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            id={`answer${index}`}
                            name="quiz"
                            value={option.text}
                            style={{ transform: 'scale(1.5)' }}
                        />
                        <label className="form-check-label text" htmlFor={`answer${index}`} style={{ paddingLeft: '10px' }}>
                            {option.text}
                        </label>
                    </div>
                ))}
                <button className="button quizButton w-100 mt-1" onClick={continueQuiz} disabled={!selected}>Continue</button>
                <div className="d-flex justify-content-center align-items-center mt-3 w-100">
                    <p className="text">{currentQuestion ? currentQuestion : 0}/{totalQuestions ? totalQuestions : 0}</p>
                </div>
            </div>
        </div>
    );
}

export default FlashCard;
