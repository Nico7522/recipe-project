import { useForm } from "react-hook-form"
import { postComment, useFetchCommentById, useFetchComments } from "../../../API/comment";
import { useFetchUser } from "../../hooks/user-hooks";
import Button from "../Button";
import { useEffect, useState } from "react";

export default function CommentForm({id}){
    const { userId }  = useFetchUser();
    const [text, setText] = useState('')
    const { mutate, error } = postComment();
    const { data } = useFetchComments()
   

    const { register, handleSubmit} = useForm()
    const handleComment =  (data) => {
        console.log('data', data);
        const comment = {
            text : data.comment,
            UserId: userId,
            RecipeId : id
        }
        console.log('data', comment);
        mutate(comment)

    }


   
    
    return (
        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(handleComment)}>
            <div className="text-center p-2">
            <label htmlFor="comment"></label>
            
            <textarea {...register('comment')} id="" cols="10" rows="5" className="w-96 rounded-lg shadow-2xl resize-none" placeholder="Your comment..."></textarea>
            </div>
            {error && userId && <span className="text-red-500">Error ! </span>}
            {(error && !userId) && <span className="text-red-500">You must be logged !</span>}
            <Button className={'bg-green-500'} type={'submit'} text={"POST"} />
        </form>
    )
}