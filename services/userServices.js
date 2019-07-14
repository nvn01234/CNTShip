import {handleException, headersWithToken} from "./_helper";
import endpoints from './_endpoints'
import authServices from "./authServices";

const myProfile = async (access_token) => {
    try {
        const response = await fetch(endpoints.MY_PROFILE, {
            method: 'GET',
            headers: headersWithToken(access_token),
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            if (responseJson.code === 100) {
                try {
                    const newAccessToken = await authServices.renewAccessToken();
                    return myProfile(newAccessToken);
                } catch (e) {
                    return Promise.reject(e);
                }
            }
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e);
    }
};

const getProfile = async (access_token, user_id) => {
    try {
        const response = await fetch(`${endpoints.USER_LIST}/${user_id}`, {
            method: 'GET',
            headers: headersWithToken(access_token),
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            if (responseJson.code === 100) {
                try {
                    const newAccessToken = await authServices.renewAccessToken();
                    return getProfile(newAccessToken);
                } catch (e) {
                    return Promise.reject(e);
                }
            }
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e);
    }
};

export default {
    myProfile,
    getProfile,
}