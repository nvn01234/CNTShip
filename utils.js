export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
};

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