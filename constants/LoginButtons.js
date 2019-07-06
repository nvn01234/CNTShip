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
        showPasswordInput: true,
        showConfirmPasswordInput: false,
    },
    register: {
        action: 'register',
        leftAction: 'login',
        rightAction: 'resetPassword',
        showPasswordInput: true,
        showConfirmPasswordInput: true,
    },
    resetPassword: {
        action: 'resetPassword',
        leftAction: 'register',
        rightAction: 'login',
        showPasswordInput: false,
        showConfirmPasswordInput: false,
    },
};