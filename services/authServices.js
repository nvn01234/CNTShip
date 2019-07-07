import endpoints from './_endpoints'
import {headers, headersWithToken, handleException} from './_helper'

const authService = (endpoint) => async (data) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e);
    }
};

const login = authService(endpoints.LOGIN);

const changePassword = async ({username, oldPassword, newPassword}) => {
    const {access_token} = await login({username, password: oldPassword});
    try {
        const response = await fetch(endpoints.CHANGE_PASSWORD, {
            method: 'POST',
            headers: headersWithToken(access_token),
            body: JSON.stringify({password: newPassword})
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e);
    }
};

export default {
    login,
    register: authService(endpoints.REGISTER),
    resetPassword: authService(endpoints.RESET_PASSWORD),
    changePassword
}