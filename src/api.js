const baseUrl = 'http://localhost:3000';

const fetchGeo = () => {
    return fetch(`${baseUrl}/geo`)
        .then(res => res.json())
};

const fetchOffices = () => {
    return fetch(`${baseUrl}/offices`)
        .then(res => res.json())
};

module.exports = {
    fetchGeo,
    fetchOffices
};