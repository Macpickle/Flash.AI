import FlashCard from "../components/FlashCard";
import { useEffect, useState } from 'react';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    const nextQuestion = () => {
        // go to the next question

    }

    useEffect(() => {
        // fetch questions from the server
    }, []);    

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <FlashCard question="What is the capital of France" description={["Paris", "London", "Berlin", "Madrid"]} />
        </div>
    );
}

export default Quiz;