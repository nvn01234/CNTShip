export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const headersWithToken = (access_token) => ({
    ...headers,
    'access-token': access_token,
});

export const handleException = (e) => {
    console.log(e);
    return Promise.reject("Có lỗi xảy ra. Vui lòng thử lại")
};
