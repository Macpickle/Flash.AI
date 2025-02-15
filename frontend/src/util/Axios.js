import axios from 'axios';

const node_environment = process.env.REACT_APP_NODE_ENV; // gets the environment of the app

// uses Axios to make requests to the server, based on environment

// creates a POST request to the server
function AxiosPost(url, data) {
    let domain = '';
    if (node_environment === 'development') {
        domain = 'http://localhost:3000';
    } else if (node_environment === 'production') {
        domain = process.env.REACT_APP_API_URL;
    } else {
        return; // invalid environment
    }

    return axios.post(
        `${domain}${url}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` ? `Bearer ${localStorage.getItem('token')}` : null,
            },
        }
    )
}

// creates a GET request to the server
function AxiosGet(url) {
    let domain = '';
    if (node_environment === 'development') {
        domain = 'http://localhost:3000';
    } else if (node_environment === 'production') {
        domain = process.env.REACT_APP_API_URL;
    } else {
        return; // invalid environment
    }

    return axios.get(
        `${domain}${url}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` ? `Bearer ${localStorage.getItem('token')}` : null,
            },
        }
    )
}

// creates a PATCH request to the server
function AxiosPatch(url, data) {
    let domain = '';
    if (node_environment === 'development') {
        domain = 'http://localhost:3000';
    } else if (node_environment === 'production') {
        domain = process.env.REACT_APP_API_URL;
    } else {
        return; // invalid environment
    }

    return axios.patch(
        `${domain}${url}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` ? `Bearer ${localStorage.getItem('token')}` : null,
            },
        }
    )
}

// creates a DELETE request to the server
function AxiosDelete(url) {
    let domain = '';
    if (node_environment === 'development') {
        domain = 'http://localhost:3000';
    } else if (node_environment === 'production') {
        domain = process.env.REACT_APP_API_URL;
    } else {
        return; // invalid environment
    }

    return axios.delete(
        `${domain}${url}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` ? `Bearer ${localStorage.getItem('token')}` : null,
            },
        }
    )
}

export { AxiosPost, AxiosGet, AxiosPatch, AxiosDelete };
