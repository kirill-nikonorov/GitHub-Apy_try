import fetch from './fetch';

const makeRequest = (url, config = {}) => {
    const baseUrl = 'users/';

    return fetch({url: `${baseUrl}${url}`, ...config});
};

export default {
    fetchUser: login => makeRequest(`${login}`),
};
