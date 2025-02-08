import NavBar from '../components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Logout from '../util/Logout';
import Card from '../components/Card';

import { GoGear } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { Tooltip } from 'react-tooltip';


function Home() {
    const [posts, setPosts] = useState([]);
    
    function handleDelete() {
        // Delete document
    }

    function handleEdit() {
        // Edit document
    }

    useEffect(() => {
        axios.get('/api/docs', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    

    return (
        <div>
            <NavBar>
                <a href="/settings" data-tooltip-id="settings-tooltip" data-tooltip-content="Settings" style={{ marginRight: '10px' }}>
                    <GoGear className="icon-gear" size={30} />
                </a>
                <Tooltip id="settings-tooltip" place="bottom" style={{ fontSize: '0.6em', padding: '0.5em' }} />
                <button onClick = {Logout} className = "icon-button" data-tooltip-id="logout-tooltip" data-tooltip-content="Logout">
                    <MdLogout className="icon" size={30} />
                </button>
                <Tooltip id="logout-tooltip" place="bottom" style={{ fontSize: '0.6em', padding: '0.5em' }} />
            </NavBar>

            <div className="container-fluid d-flex flex-column align-items-center" style={{ padding: '1%' }}>
                <div className="search-bar w-75 d-flex align-items-center">
                    <input type="text" placeholder="Search..." className="form-control me-2" />
                </div>
            </div>

            <div className="container-fluid d-flex flex-wrap justify-content-center">
                {posts.map((post, index) => (
                    <Card key={index} />
                ))}
            </div>
        </div>
    );
}

export default Home;