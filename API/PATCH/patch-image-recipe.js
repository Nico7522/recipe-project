import axios from "axios"
const URL_API = import.meta.env.VITE__URL_API;

export const updateImageRecipe = ({id, formData}) => {
    return axios.patch(`${URL_API}recipe/${id}/updateimage`, formData)
}