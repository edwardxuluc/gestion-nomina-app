export const apiUrl = 'http://localhost:13500';

export const serialize = (obj) => {
    let result = [];
    Object.entries(obj).forEach(item => {
        if (item[0] && item[1]) {
            result.push(`${item[0]}=${item[1]}`);
        }
    });
    return result.join('&');
};

export const getErrorMessage = error => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message
    }
    return 'Ha ocurrido un error al consultar el servidor';
}

// export { apiUrl };