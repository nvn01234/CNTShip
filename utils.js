import Moment from "moment";
import PaymentTypes from '@constants/PaymentTypes'
import ShipFeeTypes from '@constants/ShipFeeTypes'


export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
};

export const formatDateTime = (d) => Moment(d).format('HH:mm:ss DD/MM/YYYY');

/**
 * Get query string
 *
 * @param   {*}   query   query object (any object that Object.entries() can handle)
 * @returns {string}      query string
 */
export const querystring = (query = {}) => {
    // get array of key value pairs ([[k1, v1], [k2, v2]])
    const qs = Object.entries(query)
    // filter pairs with undefined value
        .filter(pair => pair[1] !== undefined)
        // encode keys and values, remove the value if it is null, but leave the key
        .map(pair => pair.filter(i => i !== null).map(encodeURIComponent).join('='))
        .join('&');

    return qs && '?' + qs;
};

export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const orderAmountText = (order) => {
    const parts = [];
    if (order.total) {
        parts.push(`${formatNumber(order.total)} (${PaymentTypes[order.payment_type]})`);
    }
    if (order.ship_fee) {
        parts.push(`${formatNumber(order.ship_fee)} (${ShipFeeTypes[order.ship_fee_type]})`);
    }
    return parts.join(' | ');
};