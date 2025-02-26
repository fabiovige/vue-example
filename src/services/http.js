import axios from 'axios';

const http = axios.create({
    baseURL: 'http://example-app.test:8787/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default http;
