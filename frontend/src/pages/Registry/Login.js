// components
import AuthenticationWrapper from "../../components/AuthenticationWrapper"

// hooks
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate(); // create navigate object for redirects    
    const location = useLocation(); // object to recieve data from different pages, in this case, from register account page

    // get email and password from form data
    const loginUser = (event) => {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        axios.post(`${env.API_URL}/api/auth/login`, {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("darkMode", response.data.user.darkMode);

            navigate('/home');
        }).catch((error) => {
            document.querySelector(".error").style.display = "block";
        });
    }

    // reset display of error message
    const resetError = () => {
        document.querySelector(".error").style.display = "none";
    }
    
    // sets email input field to value if redirected from registering
    useEffect(() => {
        if (location.state) {
            document.getElementById("email").value = location.state.email;
        }
        
    });

    return (
        <AuthenticationWrapper title={"Login"}>
            <div className="error alert alert-danger" style={{display: "none"}}>
                <p className="mb-0">Invalid email or password</p>
            </div>

            <div className="mt-3 mb-5">
                <p>Dont have an account? <a href="/register">Sign up</a></p>
                <form onSubmit={loginUser}>

                    <div className="mb-3">
                        <input
                            type="text"
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

                    <div className="mb-3 form-check d-flex align-items-center">
                        <input type="checkbox" id="remember"/>
                        <p className="p-0 m-0"><label className="form-check-label ms-2 mb-0" htmlFor="remember">Remember me</label></p>
                    </div>

                    <button type="submit" className="button w-100">Submit</button>
                </form>
            </div>
        </AuthenticationWrapper>
    );
}

export default Login;