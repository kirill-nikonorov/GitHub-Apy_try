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


const configureAxios = (endpoint) => {
    const axiosConfig = {};
    axiosConfig.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };
    axiosConfig.method = axiosConfig.method || 'GET';
    axiosConfig.url = `${API_ROOT}${endpoint}`;
    //   console.log("AxiosConfigs = ", axiosConfig);

    return axiosConfig;
};

const apiMiddleware = () => next => action => {
    const callApi = action[CALL_API];
    if (!callApi || (callApi == null))
        return next(action);


    const actionWith = (data) => {
        const resultAction = Object.assign({}, action, data);
        delete resultAction[CALL_API];
        return resultAction;
    };

    const {endpoint, types: [succesAction], schema} = callApi;

    const axiosConfig = configureAxios(endpoint);

    axios(axiosConfig)
        .then((responce) => {
            const camelizedJson = camelizeKeys(responce.data);
            //console.log("camelizedJson =", camelizedJson);
            const normalisedData = normalize(camelizedJson, schema);
            // console.log("normalisedData = ", normalisedData)
            next(succesAction(actionWith(normalisedData)));
        })
        .catch(handleError);
};


const handleError = ({response, request, message}) => {
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