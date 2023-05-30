import { useParams } from "react-router-dom"
import UpdateRecipe from "../../containers/recipes/recipe-update"

export default function CommentUpdatePage(){
    const { commentId } = useParams()
   
    return (
        <UpdateRecipe cId={commentId}/>
    )
}