import axios from "axios"
const URL_API = import.meta.env.VITE__URL_API;

export const contact = async ({mail, subject, body}) => {
    const { data } = await axios.post(`${URL_API}/contact`, {mail, subject, body})
    return data
}