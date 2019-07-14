import endpoints from './_endpoints'
import {headers, headersWithToken, handleException} from './_helper'
import {AsyncStorage} from 'react-native'

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

const renewAccessToken = async () => {
    const refresh_token = await AsyncStorage.getItem('refresh_token');
    if (refresh_token) {
        try {
            const response = await fetch(endpoints.RENEW_ACCESS_TOKEN, {
                method: 'POST',
                headers,
                body: JSON.stringify({refresh_token})
            });
            const responseJson = await response.json();
            if (responseJson.success) {
                const {access_token, newRefreshToken} = responseJson.data;
                await Promise.all([
                    AsyncStorage.setItem('access_token', access_token),
                    AsyncStorage.setItem('refresh_token', newRefreshToken),
                ]);
                return access_token;
            } else {
                return Promise.reject(responseJson.message);
            }
        } catch (e) {
            return handleException(e);
        }
    } else {
        return Promise.reject('Phiên đăng nhập hết hạn');
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
    changePassword,
    renewAccessToken,
}