import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000"

const axiosConfig = {
    baseURL: BASE_URL
}

const request = axios.create(axiosConfig)

request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) =>{
        return response.data
    },
    (error) =>{
        return Promise.reject(error)
    }
)

export default request