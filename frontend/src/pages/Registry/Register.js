// components
import AuthenticationWrapper from "../../components/AuthenticationWrapper"

// hooks
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate(); // create navigate object for redirects    

    // get username and password from input fields
    const registerUser = (event) => {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        axios.post("/api/auth/register", {
            email: email,
            password: password
        }).then((response) => {
            navigate('/login', {state: {email: email}});
        }).catch((error) => {
            document.querySelector(".error").style.display = "block";
        });
        
    }

    // reset display of error message
    const resetError = () => {
        document.querySelector(".error").style.display = "none";
    }

    return (
        <AuthenticationWrapper title={"Sign Up"}>
            <div className="error alert alert-danger" style={{display: "none"}}>
                <p className="mb-0">Email is already in use</p>
            </div>

            <div className="mt-3 mb-5">
                <form onSubmit={registerUser}>
                    {/*
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            required
                            autoComplete="on"
                            onChange={resetError}
                        />
                    </div>
                    */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            required
                            autoComplete="on"
                            onChange={resetError}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            required
                            autoComplete="on"
                            onChange={resetError}
                        />
                    </div>

                    <button type="submit" className="button w-100">Submit</button>
                </form>

                <div className="mt-1 text-center">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </AuthenticationWrapper>
    );
}

export default Register;