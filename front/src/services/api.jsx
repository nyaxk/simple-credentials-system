import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5454';

const ApiClient = () => {

    const defaultOptions = {
        baseURL,
    };

    return axios.create(defaultOptions);
};

export default ApiClient();