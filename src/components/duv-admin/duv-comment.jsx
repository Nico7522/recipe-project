import { deleteComment, validComment } from "../../../API/comment";
import Button from "../button";


export default function ({id}) {
    const validComments = validComment()
    const deleteComments = deleteComment()

    return (
        <div className="sm:flex-col md:flex-row flex flex-col justify-center">
            <Button onClick={() => validComments.mutate({id:id, validity: true})} text={"Valid"}/>
            <Button onClick={() => validComments.mutate({id:id, validity: false})} text={"Unvalid"} className={"bg-red-300"}/>
            <Button onClick={() => deleteComments.mutate(id)} text={"Delete"} className={"bg-red-300"}/>


        </div>
    )
}