function NavBar() {
    return (
        <div className="navbar navbar-light bg-light" style={{ paddingLeft: '5%', paddingRight: '5%' }}>    
            <h2 className="navbar-brand">Flash.AI</h2>

            <div className="d-flex">
                <a href="/register" className = "button">Sign Up</a>
            </div>
        </div>
    )
}

export default NavBar;