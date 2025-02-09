const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('darkMode');
    window.location.href = '/';
}

export default Logout;