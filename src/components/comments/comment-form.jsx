import { useForm } from "react-hook-form"
import Button from "../button";

export default function CommentForm(){
    const { register, handleSubmit} = useForm()
    const handleComment = (data) => {
        console.log(data);

    }
    return (
        <form onSubmit={handleSubmit(handleComment)}>
            <label htmlFor="comment">Comment</label>
            <input {...register('comment')} type="textarea" />
            <Button type={'submit'} text={"POST"} />
        </form>
    )
}