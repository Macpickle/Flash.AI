import logo from "../assets/logo-small.png";

function NavBar({ children }) {
    return (
        <div className="navbar navbar-light bg-light" style={{ paddingLeft: '5%', paddingRight: '5%', zIndex: '1000' }}>    
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={logo} alt="LOGO" style={{ width: '50px', height: '50px' }} />
                <h2 className = "title">Flash.AI</h2>
            </div>

            <div>{children}</div>
        </div>
    )
}

export default NavBar;