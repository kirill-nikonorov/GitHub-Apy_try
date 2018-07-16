import axios from "axios/index";
import {camelizeKeys} from "humps"
import {normalize, schema} from "normalizr";
import {showErrorNotification} from "../service";

export const CALL_API = 'Call API';
const API_ROOT = 'https://api.github.com/';

const userSchema = new schema.Entity("users", {}, {idAttribute: (value) => value.login.toLowerCase()});
const repoSchema = new schema.Entity("repos", {}, {idAttribute: (value) => value.fullName.toLowerCase()});


export const Schemas = {
    USER: userSchema,
    REPO: repoSchema,
    USER_ARRAY: [userSchema],
    REPO_ARRAY: [repoSchema],
};

const getNextPageUrl = response => {
    const link = response.headers.link;
    if (!link) {
        return null
    }


    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!nextLink) {
        return null
    }

    return nextLink.trim().split(';')[0].slice(1, -1)
}

const configureAxios = (url) => {
    const axiosConfig = {};
    axiosConfig.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };
    axiosConfig.method = axiosConfig.method || 'GET';
    axiosConfig.url = url;

    return axiosConfig;
};

const apiMiddleware = () => next => action => {
    const callApi = action[CALL_API];
    if (!callApi || (callApi == null))
        return next(action);


    const {endpoint, types: [requestAction, successAction], schema} = callApi;


    const url = endpoint.indexOf(API_ROOT) > -1 ? endpoint : API_ROOT + endpoint;

    const actionWith = (data = {}) => {
        const resultAction = Object.assign({}, action, data);
        delete resultAction[CALL_API];
        return resultAction;
    };
    const axiosConfig = configureAxios(url);

    next(requestAction(actionWith()));

    axios(axiosConfig)
        .then((response) => {
            const camelizedJson = camelizeKeys(response);
            //console.log("camelizedJson =", camelizedJson);

            const nextPageUrl = getNextPageUrl(response);

            const normalisedData = normalize(camelizedJson.data, schema);
            // console.log("normalisedData = ", normalisedData)

            next(successAction(actionWith(
                Object.assign({}, normalisedData, {nextPageUrl}))))
        })
        .catch(handleError);
};


const handleError = ({response, request, message}) => {
    console.log("Error Occurred");
    if (response) {
        console.log('Error', response);
        const {data, status} = response;
        showErrorNotification(status, data);
    } else if (request) {
        console.log('Error', request);
        showErrorNotification('', request);
    } else {
        showErrorNotification('', message);
        console.log('Error', message);
    }
};


export default apiMiddleware