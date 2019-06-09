const API_ROOT  = 'http://103.109.36.15:9001/v1/';

export default {
    LOGIN: API_ROOT + 'account/login',
    SIGNUP: API_ROOT + 'account/register',
    RESETPWD: API_ROOT + 'account/resetPassword',
    LOGOUT: API_ROOT + 'account/logout',
    USER_PROFILE: API_ROOT + 'users/me',
    CHANGE_PWD: API_ROOT + 'account/changePassword',
}