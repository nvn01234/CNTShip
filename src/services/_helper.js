export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const exceptionHandler = () => Promise.reject("Có lỗi xảy ra. Vui lòng thử lại");
