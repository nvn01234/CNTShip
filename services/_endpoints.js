const API_ROOT = 'http://103.109.36.15:9001/v1/';

export default {
    LOGIN: API_ROOT + 'account/login',
    REGISTER: API_ROOT + 'account/register',
    RESET_PASSWORD: API_ROOT + 'account/resetPassword',
    RENEW_ACCESS_TOKEN: API_ROOT + 'account/renewAccessToken',
    LOGOUT: API_ROOT + 'account/logout',
    MY_PROFILE: API_ROOT + 'users/me',
    CHANGE_PASSWORD: API_ROOT + 'account/changePassword',
    ORDER_LIST: API_ROOT + 'orders',
    USER_LIST: API_ROOT + 'users',
}