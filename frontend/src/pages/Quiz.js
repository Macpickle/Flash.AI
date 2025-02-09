import FlashCard from "../components/FlashCard";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

    const submitAnswer = (answer) => {
        if (answer === questions[currentQuestion].multipleChoice.options.find(option => option.isCorrect).text) {
            setCorrectQuestions([...correctQuestions, true]);
            setScore(score + 1);
        } else {
            setCorrectQuestions([...correctQuestions, false]);
        }

        const correctAnswerText = questions[currentQuestion].multipleChoice.options.find(option => option.isCorrect).text.replace(/"/g, '\\"');
        const correctAnswerElement = document.querySelector(`input[value="${correctAnswerText}"]`);
        if (correctAnswerElement) {
            correctAnswerElement.parentElement.style.outline = "2px solid lime";
        }

    }

    const continueQuiz = () => {
        setCurrentQuestion(currentQuestion + 1);
        document.querySelector('#questionoutline').style.outline = "none";
    }

    useEffect(() => {
        // fetch questions from the server
        const id = window.location.pathname.split('/').pop();

        axios.get(`/api/docs/${id}`, { 
            headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
            } 
        }).then(response => {
            setQuestions(response.data.flashCards || []);
            setLoading(false);
        }).catch(error => {
            console.error(error);
        });
    }, []);    

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            {loading ? (
                <div className="border p-4 w-100 h-75 text-center" style={{ maxWidth: '600px' }}>
                    <div className="spinner-border" role="status" style={{color: "#FFA07A"}} ></div>                
                </div>
            ) : (
                currentQuestion < questions.length ? (
                    <FlashCard 
                        question={questions[currentQuestion].question} 
                        multipleChoice={questions[currentQuestion].multipleChoice} 
                        submitAnswer={submitAnswer}
                        difficulty={questions[currentQuestion].difficulty}
                        currentQuestion={currentQuestion + 1}
                        totalQuestions={questions.length}
                        continueQuiz={continueQuiz}
                    />
                ) : (
                    <div className="border p-4 w-100 h-75 text-center" style={{ maxWidth: '600px' }}>
                        <h2 className="title">Quiz Complete</h2>
                        <p className="text">You scored {score}/{questions.length}!</p>
                        
                        <div className="d-flex justify-content-center align-items-center mt-3 flex-column h-50">
                            <h3 className="title">Review Incorrect Answers:</h3>

                            <div className="d-flex border justify-content-center align-items-start mt-3 h-100 w-100 overflow-auto p-3">
                                <ul className="w-100 p-0">
                                    {correctQuestions.map((isCorrect, index) => 
                                        !isCorrect && (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center" style={{ borderBottom: '1px solid lightgrey' }}>
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <span className="text-left text" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{`${questions[index].question}`}</span>
                                                    <span className="text-right text" style={{ wordWrap: 'break-word', whiteSpace: 'normal', color: "#ff8b76" }}>{`Answer: ${questions[index].multipleChoice.options.find(option => option.isCorrect).text}`}</span>
                                                </div>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-center align-items-center mt-3 flex-column h-25">
                            <button className="button w-100 mb-1" onClick={() => window.location.reload()}>Restart Quiz</button>
                            <button className="button w-100" onClick={() => navigate('/home')}>Back Home</button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Quiz;