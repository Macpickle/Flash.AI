import NavBar from '../components/Navbar';
import { GoGear } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { Tooltip } from 'react-tooltip';


const testCard = (index) => {
    return (
        <div className="card doc m-2 d-flex flex-column justify-content-center align-items-center" key={index} style={{ width: '100%', maxWidth: '20dvw', height: 'auto', aspectRatio: '1/1' }}>
            <div className="hide d-flex justify-content-end w-100">
                <button className="transparent-button" data-tooltip-id={`edit-tooltip-${index}`} data-tooltip-content="Edit">
                    <IoMdCreate className="icon" size={30} />
                </button>
                <Tooltip id={`edit-tooltip-${index}`} place="bottom" style={{ fontSize: '0.4em' }} />
                <button className="transparent-button" data-tooltip-id={`delete-tooltip-${index}`} data-tooltip-content="Delete">
                    <MdDelete className="icon" size={30} />
                </button>
                <Tooltip id={`delete-tooltip-${index}`} place="bottom" style={{ fontSize: '0.4em' }} />
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
                <h5 className="card-title text-center">Sample Title</h5>
                <p className="card-text text-center">01/01/2023</p>
            </div>
        </div>
    )
}

function Home() {
    function handleDelete() {
        // Delete document
    }

    function handleEdit() {
        // Edit document
    }

    return (
        <div>
            <NavBar>
                <a href="/settings" data-tooltip-id="settings-tooltip" data-tooltip-content="Settings" style={{ marginRight: '10px' }}>
                    <GoGear className="icon-gear" size={30} />
                </a>
                <Tooltip id="settings-tooltip" place="bottom" style={{ fontSize: '0.6em', padding: '0.5em' }} />
                <a href="/logout" data-tooltip-id="logout-tooltip" data-tooltip-content="Logout">
                    <MdLogout className="icon" size={30} />
                </a>
                <Tooltip id="logout-tooltip" place="bottom" style={{ fontSize: '0.6em', padding: '0.5em' }} />
            </NavBar>

            <div className="container-fluid d-flex flex-column align-items-center" style={{ padding: '1%' }}>
                <div className="search-bar w-75 d-flex align-items-center">
                    <input type="text" placeholder="Search..." className="form-control me-2" />
                </div>
            </div>

            <div className="container-fluid d-flex flex-wrap justify-content-center">
                {Array.from({ length: 9 }).map((_, index) => (
                    testCard(index)
                ))}
            </div>
        </div>
    );
}

export default Home;