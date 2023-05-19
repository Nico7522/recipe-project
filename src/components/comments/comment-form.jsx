import { useForm } from "react-hook-form"
import Button from "../button";

export default function CommentForm(){
    const { register, handleSubmit} = useForm()
    const handleComment = (data) => {
        console.log(data);

    }
    return (
        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(handleComment)}>
            <div className="text-center">
            <label htmlFor="comment">Comment</label>
            
            <textarea {...register('comment')} id="" cols="10" rows="5" className="w-96 rounded-lg shadow-2xl resize-none" placeholder="Your comment..."></textarea>
            </div>
            <Button className={'bg-green-500'} type={'submit'} text={"POST"} />
        </form>
    )
}