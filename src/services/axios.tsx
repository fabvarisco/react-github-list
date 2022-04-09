import axios from "axios";

export const instanceAxios = axios.create({
    baseURL: import.meta.env.APP_URL || "https://api.github.com",
    timeout: 1000,
    params:{
        client_id:import.meta.env.CLIENT_ID
    }
})