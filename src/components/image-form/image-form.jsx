import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateImage } from "../../../API/recipe";
import Button from "../button";

export default function ImageForm({ id }) {
  const upload = updateImage();
  const { register, handleSubmit } = useForm();
  const handleSubmitImage = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    upload.mutate({ id, formData });
  
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitImage)} className=" w-40 flex flex-col-reverse">
      <label
        className="text-sm  font-medium text-green-900 dark:text-green"
        htmlFor="image"
      >
        Image recipe
      </label>
      <input
        {...register("image")}
        className="w-[121px] ml-5 h-7 text-sm text-gray-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="image"
        type="file"
      />

      <Button  text={"upload"} type={"submit"}></Button>
    </form>
  );
}
