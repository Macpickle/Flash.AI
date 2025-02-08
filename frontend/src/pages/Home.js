import NavBar from '../components/Navbar';
import { GoGear } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";

const testCard = (index) => {
    return (
        <div className="card doc m-2" key={index} style={{width: '20dvw', height: '20dvw'}}>
            <div className="hide">
                <button className = "transparent-button"><IoMdCreate className="icon" size={30} /></button>
                <button className = "transparent-button"><MdDelete className="icon" size={30} /></button>
            </div>

            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Sample Title</h5>
                <p className="card-text">01/01/2023</p>
            </div>
        </div>
    )
}

function Home() {
    return (
        <div>
            <NavBar>
                <a href="/settings"><GoGear className="icon-gear" size={30} /></a>
            </NavBar>

            <div className="container-fluid d-flex flex-column align-items-center" style = {{padding: '1%'}}>
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