// components
import NavBar from "../components/Navbar";
import Logout from "../util/Logout";

// icons
import { IoMdArrowBack } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

// routing
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const username = document.getElementById('username').value ? document.getElementById('username').value : null;
        const email = document.getElementById('email').value ? document.getElementById('email').value : null;
        const password = document.getElementById('password').value ? document.getElementById('password').value : null;
        const confirmPassword = document.getElementById('confirm-password').value ? document.getElementById('confirm-password').value : null;
        const darkMode = document.getElementById('themeSwitch').checked ? true : false;

        // Update user settings
        axios.patch('/api/auth/update', {
            username,
            email,
            password,
            confirmPassword,
            darkMode
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.data.user.darkMode !== localStorage.getItem('darkMode')) {
                localStorage.setItem('darkMode', response.data.user.darkMode);
            }
            navigate('/home');
            window.location.reload();
        }).catch(error => {
            console.error(error);
        });
    }

    const deleteUser = () => {
        // Delete user account
        axios.delete('/api/auth/delete', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            navigate('/login');
            Logout();
        }).catch(error => {
            console.error(error);
        });
    }
    
    return (
        <div>
            <NavBar>
                <a href="/home" data-tooltip-id="settings-tooltip" data-tooltip-content="Home">
                    <IoMdArrowBack className="icon" size={30} />
                </a>
                <Tooltip id="settings-tooltip" place="bottom" style={{ fontSize: '0.6em' }} />
            </NavBar>

            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="container-fluid p-5 mb-5 text-center" style={{ maxWidth: '750px', width: '100%' }}>
                    <h2 className="title">Settings</h2>
                    <p className = "text">update preferences and fields</p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
                            <label className="text d-block" htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter username" />
                        </div>
                        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
                            <label className="text d-block" htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
                            <label className="text d-block" htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" />
                        </div>
                        <div className="form-group mb-3" style={{ textAlign: 'left' }}>
                            <label className="text d-block" htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm-password" placeholder="Confirm password" />
                        </div>
                        <div className="form-group">
                            <div className="d-flex justify-content-center align-items-center gap-1">
                                <label htmlFor="themeSwitch" className="theme-switch__label">
                                    <CiLight className="icon" size={25} />
                                </label>
                                    <input type="checkbox" id="themeSwitch" name="theme-switch" className="theme-switch__input" />
                                <label htmlFor="themeSwitch" className="theme-switch__label">
                                    <MdDarkMode className="icon" size={25} />
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="button  mt-3 w-75">Submit</button>
                        <div className="d-flex justify-content-center mt-3 gap-2">
                            <button type="button" onClick = {Logout} className="button secondary w-25">Logout</button>
                            <button type="button" onClick = {deleteUser} className="button secondary w-25">Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings;