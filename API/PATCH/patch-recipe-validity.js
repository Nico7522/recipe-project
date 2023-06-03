import axios from "axios";


export const updateRecipeValidity = ({ id, validity }) => {
        return axios.patch(`http://localhost:8080/api/recipe/admin/${id}`, {
          valid: validity,
        });
      
}