import axios from "axios";
const URL_API = import.meta.env.VITE__URL_API;


export const updateRecipeValidity = ({ id, validity }) => {
        return axios.patch(`${URL_API}recipe/admin/${id}`, {
          valid: validity,
        });
      
}