import NavBar from "../components/Navbar";
import { IoMdArrowBack } from "react-icons/io";
import { Tooltip } from 'react-tooltip';

function Settings() {
    return (
        <div>
            <NavBar>
                <a href="/home" data-tooltip-id="settings-tooltip" data-tooltip-content="Settings">
                    <IoMdArrowBack className="icon" size={30} />
                </a>
                <Tooltip id="settings-tooltip" place="bottom" style={{ fontSize: '0.6em' }} />
            </NavBar>

            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="p-5 mb-5 w-50 text-center">
                    <h2 className="title mb-5">Settings</h2>
                    
                    <form>
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
                        <button type="submit" className="button mt-3 w-75">Submit</button>
                        <div className="d-flex justify-content-center mt-3 gap-2">
                            <button type="button" className="button secondary w-25">Logout</button>
                            <button type="button" className="button secondary w-25">Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings;