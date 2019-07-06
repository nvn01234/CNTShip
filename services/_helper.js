export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const handleException = (e) => Promise.reject("Có lỗi xảy ra. Vui lòng thử lại");
