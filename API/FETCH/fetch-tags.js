import axios from "axios"
const URL_API = import.meta.env.VITE__URL_API;

export const fetchTags = async () => {
    const { data } = await axios.get(`${URL_API}/tag`)
    return data.results
}