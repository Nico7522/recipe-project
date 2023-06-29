import axios from "axios"
import { useFetchUser } from "../../src/hooks/user-hooks";
const URL_API = import.meta.env.VITE__URL_API;

export const contact = async ({mail, subject, body, config}) => {
    axios.defaults.withCredentials = true;
    console.log(mail, subject, body, config);
    const { data } = await axios.post(`${URL_API}/contact`, {mail, subject, body} , config)
    return data
}