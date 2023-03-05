import axios from "axios";

export const http = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL}/api/v1`,
    headers : {
        'content-type': 'application/json'
    }
})
