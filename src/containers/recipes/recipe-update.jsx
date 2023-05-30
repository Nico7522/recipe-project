
import { useEffect, useState } from "react";
import { useFetchCommentById } from "../../../API/comment";
import { useForm } from "react-hook-form";

export default function UpdateRecipe ({cId})  {
  
    const [comment, setComment] = useState()
const {error, data, isFetched, isLoading} = useFetchCommentById({cId})



console.log(comment);
const {register, setValue} = useForm({
    defaultValues: {
        comment: data  ? data : ""
    }
});
useEffect(() => {
    setValue('comment', data ? data : "" )

})
return (
    <form action="">
        <textarea {...register('comment')} id="" cols="30" rows="10"></textarea>
    </form>
)

}