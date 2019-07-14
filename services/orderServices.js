import endpoints from './_endpoints'
import {headersWithToken, handleException} from './_helper'
import {querystring} from '@utils'
import authServices from './authServices'

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
            if (responseJson.code === 100) {
                try {
                    const newAccessToken = await authServices.renewAccessToken();
                    return orderList(newAccessToken, params);
                } catch (e) {
                    return Promise.reject(e);
                }
            }
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e)
    }
};

const createOrder = async (access_token, formData) => {
    try {
        const response = await fetch(endpoints.ORDER_LIST, {
            method: 'POST',
            headers: headersWithToken(access_token),
            body: JSON.stringify(formData),
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            if (responseJson.code === 100) {
                try {
                    const newAccessToken = await authServices.renewAccessToken();
                    return createOrder(newAccessToken, formData);
                } catch (e) {
                    return Promise.reject(e);
                }
            }
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e)
    }
};

const updateOrder = async (access_token, formData) => {
    try {
        const response = await fetch(`${endpoints.ORDER_LIST}/${formData.order_id}`, {
            method: 'PUT',
            headers: headersWithToken(access_token),
            body: JSON.stringify(formData),
        });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            if (responseJson.code === 100) {
                try {
                    const newAccessToken = await authServices.renewAccessToken();
                    return updateOrder(newAccessToken, formData);
                } catch (e) {
                    return Promise.reject(e);
                }
            }
            return Promise.reject(responseJson.message);
        }
    } catch (e) {
        return handleException(e)
    }
};

export default {
    orderList,
    createOrder,
    updateOrder,
}