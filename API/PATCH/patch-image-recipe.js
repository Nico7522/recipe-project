import axios from "axios"

export const updateImageRecipe = ({id, formData}) => {
    return axios.patch(`http://localhost:8080/api/recipe/${id}/updateimage`, formData)
}