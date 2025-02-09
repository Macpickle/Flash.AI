function Quiz() {
return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 w-100 h-75 text-center" style={{ maxWidth: '600px' }}>
            <h2 className="title">Question</h2>
            <p className="text">What is the capital of France?</p>
            <div className="d-flex justify-content-start align-items-start flex-column">
                <div className="form-check border w-100 text-left d-flex align-items-center mb-1" htmlFor="answer1" onClick={() => document.getElementById('answer1').click()}>
                    <input className="form-check-input" type="radio" id="answer1" name="quiz" value="Paris" style={{ transform: 'scale(1.5)' }} />
                    <label className="form-check-label text" htmlFor="answer1" style={{ paddingLeft: '10px' }}>Paris</label>
                </div>
                <div className="form-check border w-100 text-left d-flex align-items-center mb-1" htmlFor="answer2" onClick={() => document.getElementById('answer2').click()}>
                    <input className="form-check-input" type="radio" id="answer2" name="quiz" value="London" style={{ transform: 'scale(1.5)' }} />
                    <label className="form-check-label text" htmlFor="answer2" style={{ paddingLeft: '10px' }}>London</label>
                </div>
                <div className="form-check border w-100 text-left d-flex align-items-center mb-1" htmlFor="answer3" onClick={() => document.getElementById('answer3').click()}>
                    <input className="form-check-input" type="radio" id="answer3" name="quiz" value="Berlin" style={{ transform: 'scale(1.5)' }} />
                    <label className="form-check-label text" htmlFor="answer3" style={{ paddingLeft: '10px' }}>Berlin</label>
                </div>
                <div className="form-check border w-100 text-left d-flex align-items-center mb-1" htmlFor="answer4" onClick={() => document.getElementById('answer4').click()}>
                    <input className="form-check-input" type="radio" id="answer4" name="quiz" value="Madrid" style={{ transform: 'scale(1.5)' }} />
                    <label className="form-check-label text" htmlFor="answer4" style={{ paddingLeft: '10px' }}>Madrid</label>
                </div>

                <button className="button quizButton w-100 mt-1">Submit</button>

                <div className="d-flex justify-content-center align-items-center mt-3 w-100">
                    <p className="text">1/10</p>
                </div>
            </div>
        </div>
    </div>
);
}

export default Quiz;