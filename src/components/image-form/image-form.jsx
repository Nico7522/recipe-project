import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateImage } from "../../../API/recipe";

export default function ImageForm({id}){
        const upload = updateImage()
        const { register, handleSubmit } = useForm();
        const handleSubmitImage = (data) => {
          const formData = new FormData();
          formData.append("image", data.file[0]);
          upload.mutate({id, formData})
    
        
        };
        return (
          <form onSubmit={handleSubmit(handleSubmitImage)}>
           
            <label htmlFor="file">Image</label>
            <input {...register("file")} type="file" id="picture" />
            <button type="submit">Upload your image</button>
          </form>
        );
}