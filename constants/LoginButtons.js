export const BUTTON_TEXTS = {
    login: 'Đăng nhập',
    register: 'Đăng ký',
    resetPassword: 'Quên mật khẩu',
};

export const ACTION_TO_STATE = {
    login: {
        action: 'login',
        leftAction: 'register',
        rightAction: 'resetPassword',
        showEmailInput: false,
        showUsernameInput: true,
        showPasswordInput: true,
        showConfirmPasswordInput: false,
    },
    register: {
        action: 'register',
        leftAction: 'login',
        rightAction: 'resetPassword',
        showEmailInput: true,
        showUsernameInput: true,
        showPasswordInput: true,
        showConfirmPasswordInput: true,
    },
    resetPassword: {
        action: 'resetPassword',
        leftAction: 'register',
        rightAction: 'login',
        showEmailInput: true,
        showUsernameInput: false,
        showPasswordInput: false,
        showConfirmPasswordInput: false,
    },
};