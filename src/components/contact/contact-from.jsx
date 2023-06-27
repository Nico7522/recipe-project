import { useForm } from "react-hook-form";
import Button from "../button";

import { sendMessage } from "../../../API/contact";
import ErrorDisplay from "../responses/error-display";
import { useEffect } from "react";
import { useState } from "react";


export default function ContactForm() {
  const send = sendMessage();
  const [messageSend, setMessageSend] = useState('')
  const { register, handleSubmit, formState: { errors }, reset, } = useForm({ criteriaMode: "all"});
  const handleMessage = (data) =>  { 
    send.mutate(data); 
    setMessageSend('Your message has been send !');
    setTimeout(() => {
        setMessageSend('')
        reset()
    }, 3000);
    };

  return (
    <form onSubmit={handleSubmit(handleMessage)} className="flex flex-col w-96 m-auto mt-5">
      <label className="text-white" htmlFor="mail"> Mail :{" "} </label>
      <input
        type="text"
        className="rounded-2xl"
        {...register("mail", {
          required: "Required field !",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Invalid mail !",
          },
        })}
      />
      {errors.mail && <ErrorDisplay errors={errors} name={'mail'} />}
      <label className="text-white" htmlFor="subject"> Subject :{" "} </label>
      <input type="text" 
        className="rounded-2xl"
        {...register("subject", { 
          required: "Required field !", 
          maxLength: { value: 50, message: "Max 50 characters !"
          },
        })} />
      {errors.subject && <ErrorDisplay errors={errors} name={'subject'} />}
      <label className="text-white" htmlFor="message"> Message :{" "} </label>
      <textarea
        className="rounded-2xl"
        cols="30"
        rows="10"
        {...register("body", { 
            required: "Required field !"
          },
        )}
      ></textarea>
      {errors.body && <ErrorDisplay errors={errors} name={"body"} />}
      <Button className={"w-56 m-auto mt-2"} text={"Send"} />
      {send.error && <p>Error !</p>}
      {send.isSuccess && ( <p className="text-green-800 text-3xl">{messageSend}</p> )}

    </form>
  );
}
