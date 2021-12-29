const config = {
    VERSION: 'VERSION',
};

export default config;

// export const SERVER_API_URL = 'https://reactjs-jira-clone.herokuapp.com/api';
export const SERVER_API_URL = 'http://localhost:8081/api';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const USER_LOGIN_LOCAL_STORAGE = 'USER_LOGIN_LOCAL_STORAGE';

export const AUTHORITIES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER',
    ANONYMOUS: 'ANONYMOUS'
};

export const messages = {
    DATA_ERROR_ALERT: 'Internal Error',
};

export const APP_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const APIMethod = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
    OPTION: "OPTION",
}

export const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    UN_AUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}