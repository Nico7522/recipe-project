import { validComment } from "../../../API/comment";
import Button from "../Button";

export default function ({id}) {
    const validComments = validComment()
 

    return (
        <div className="sm:flex-col md:flex-row flex flex-col justify-center">
            <Button onClick={() => validComments.mutate({id:id, validity: true})} text={"Valid"}/>
            <Button text={"Unvalid"} className={"bg-red-300"}/>
            <Button text={"Delete"} className={"bg-red-300"}/>


        </div>
    )
}