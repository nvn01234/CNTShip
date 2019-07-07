import endpoints from './_endpoints'
import {headersWithToken, handleException} from './_helper'
import {querystring} from '@utils'

const orderList = async (access_token, params) => {
    try {
        const query = querystring(params);
        const response = await fetch(`${endpoints.ORDER_LIST}${query}`, {
            method: 'GET',
            headers: headersWithToken(access_token),
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return {
                orders: responseJson.data,
                hasMore: responseJson.paging.page < responseJson.paging.total_page
            };
        } else {
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e)
    }
};

export default {
    orderList
}