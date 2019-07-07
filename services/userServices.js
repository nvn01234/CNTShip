import {handleException, headersWithToken} from "./_helper";
import endpoints from './_endpoints'

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
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e);
    }
};

export default {
    myProfile
}