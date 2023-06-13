import axios from "axios"

export const fetchTags = async () => {
    const { data } = await axios.get('http://localhost:8080/api/tag')
    return data
}