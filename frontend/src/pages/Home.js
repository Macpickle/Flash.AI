import NavBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import Logout from '../util/Logout';
import Card from '../components/Card';
import Create from './Create';
import { AxiosGet } from "../util/Axios";

import { GoGear } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { Tooltip } from 'react-tooltip';

function Home({changeTheme}) {
    const [posts, setPosts] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        changeTheme();
      }, []);

    // changes view based on show, if show is true, then it will show the create component
    function handleView() {
        setShowCreate(!showCreate);
    }

    useEffect(() => {
        AxiosGet('/api/docs')
            .then(response => {
                setPosts(response.data || []);
            })
            .catch(error => {
                console.error(error);
        });
    }, []);

    const filteredPosts = posts.filter(post => 
        (post.title && post.title.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
        (post.content && post.content.toLowerCase().startsWith(searchQuery.toLowerCase()))
    );
    
    return (
        <div>
            <NavBar>
                <a href="/settings" data-tooltip-id="settings-tooltip" data-tooltip-content="Settings" style={{ marginRight: '10px' }}>
                    <GoGear className="icon-gear" size={30} />
                </a>
                <Tooltip id="settings-tooltip" place="bottom" style={{ fontSize: '0.6em', padding: '0.5em' }} />
                <button onClick={Logout} className="icon-button" data-tooltip-id="logout-tooltip" data-tooltip-content="Logout">
                    <MdLogout className="icon" size={30} />
                </button>
                <Tooltip id="logout-tooltip" place="bottom" style={{ fontSize: '0.6em', padding: '0.5em' }} />
            </NavBar>

            {showCreate && <Create handleView={handleView} />}

            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ padding: '1%' }}>
                <div className="search-bar w-50 d-flex align-items-center me-2">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="form-control" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="button" onClick={handleView}>Create</button>
            </div>

            <div className="container-fluid d-flex flex-wrap justify-content-center">
                {filteredPosts.length > 0 ? filteredPosts.map((post, index) => (
                    <Card key={index} post={post} />
                )) : 
                <div className="d-flex justify-content-center flex-column align-items-center mt-5">
                    <h2 className="title">No posts found</h2>
                    <p className="text">Create a new post to get started!</p>
                </div>
                }
            </div>
        </div>
    );
}

export default Home;