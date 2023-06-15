import { useForm } from "react-hook-form"
import { forgotPassword } from "../../../API/POST/user";
import { useState } from "react";
import Button from "../../components/button";

export default function ForgotPassword(){
    const [response, setResponse] = useState('');
    const {register, handleSubmit, reset} = useForm()
    const handleMail = ({ mail }) => {
        console.log(mail);
        forgotPassword(mail).then((r) => setResponse('Mail has been send !')).catch(() => setResponse('Error'))
    }
    return(
        <form className="mt-72 flex flex-col items-center justify-center gap-2 border-4 border-green-600 w-96 m-auto mb-3" onSubmit={handleSubmit(handleMail)} >
            <label className="text-white font text-2xl" htmlFor="mail">Please, enter your mail account : </label>
            <input {...register('mail')} type="text" />
            <Button text={"Send"} className={"mb-3"} />
            {<p className={response === "Error" ? 'text-red-700 font text-2xl' : 'text-green-700 font text-2xl'}>{response}</p>}
        </form>
    )
}