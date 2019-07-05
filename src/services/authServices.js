import endpoints from './_endpoints'
import {headers, exceptionHandler} from './_helper'

const MESSAGE_MAP = {
    'Trường `username` được yêu cầu': 'Vui lòng nhập tên đăng nhập',
    'Trường `password` được yêu cầu': 'Vui lòng nhập mật khẩu',
    'Sai username hoặc mật khẩu': 'Sai tên đăng nhập hoặc mật khẩu',
};

const transformResponseMessage = (message) => {
    if (MESSAGE_MAP.hasOwnProperty(message)) {
        message = MESSAGE_MAP[message];
    }
    return message;
};

const authService = (endpoint) => async ({username, password}) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({username, password})
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            const message = transformResponseMessage(responseJson.message);
            return Promise.reject(message);
        }
    } catch (e) {
        return exceptionHandler();
    }
};

export default {
    login: authService(endpoints.LOGIN),
    register: authService(endpoints.REGISTER),
    resetPassword: authService(endpoints.RESET_PASSWORD),
}