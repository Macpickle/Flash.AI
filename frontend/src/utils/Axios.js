import axios from 'axios';
const node_environment = import.meta.env.VITE_NODE_ENV; // gets the environment of the app

// Axios interceptor to add the token to the request headers
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios request function, takes in an object with url, method, and data
function AxiosRequest({url, method = 'get', data = {}}) {
    return axios({
        method: method,
        url: `${node_environment === 'development' ? 'http://localhost:3000' : ''}${url}`,
        data: data
    });
}

export default AxiosRequest;