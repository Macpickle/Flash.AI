import NavBar from '../components/Navbar';

function Landing() {
    return (
        <div className="landing" style={{ height: '100vh', overflow: 'hidden' }}>
            <NavBar>
                <a href="/register" className="button">Sign Up</a>
            </NavBar>
        
            <div className="container main" style={{ height: '100%', overflow: 'hidden' }}>
                <div className="computer position-absolute mt-5" style={{ marginLeft: "-25%" }}>   
                    <h1 className="display-1">Flash.AI</h1>
                    <p className="lead">Upload. Quiz. Master. Ace Your Exams with Flash.AI!</p>
                    <a href="/login" className="button">Get Started</a>
                </div>
                <div className="phone container-fluid" style={{ textAlign: 'center' }}>
                    <h1 className="display-1">Flash.AI</h1>
                    <p className="lead">Upload. Quiz. Master. Ace Your Exams with Flash.AI!</p>
                    <a href="/login" className="button">Get Started</a>
                </div>
                <div className="cutoff"></div>
            </div>
        </div>
    );
}

export default Landing;