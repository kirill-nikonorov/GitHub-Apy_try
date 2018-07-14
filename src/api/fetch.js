import axios from 'axios';

const API_ROOT = 'https://api.github.com/';

export default (config) => {
    const axiosConfig = config || {};

    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    /* const reduxItem = JSON.parse(localStorage.getItem('redux'));
     if (reduxItem && reduxItem.token) headers.Authorization = `Token ${reduxItem.token}`;
 */
    axiosConfig.headers = headers;
    axiosConfig.method = axiosConfig.method || 'GET';
    axiosConfig.url = `${API_ROOT}${axiosConfig.url}`;

    return axios(axiosConfig);
};

