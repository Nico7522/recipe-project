import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { deleteRecipe } from "../../../API/recipe";
import Comment from "../comments/comment";
import Ingredient from "../ingredients/ingrediient";
import Reaction from "../reactions/reactions";


export default function Recipe({
  id,
  name,
  imgURL,
  description,
  ingredients,
  comments,
  reactions,
  creatorId,
  userStatus,
  userId
}) {
    const { mutate } = deleteRecipe()
    comments.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
     

  return (
    <div
      key={id}
      className="mx-auto mt-5 w-10/12 border-4 bg-green-300 border-green-500 rounded-2xl relative "
    >
      {(userId === creatorId) && <button onClick={() => mutate(id)} className="w-6 h-6 absolute right-0 border-2 border-gray-600 bg-black text-red-700 text-center">X</button> }
      
      <h2 className="uppercase tracking-widest text-3xl text-center title">{name}</h2>
      <div className="w-1/4 flex flex-row justify-center m-auto">
        <img src={"http://localhost:8080"+imgURL} className="rounded-2xl block m-auto " alt="" />
        <div className=" h-60 border-4 border-red-300 ">
            <h2 className="text-2xl font">Description</h2>
        <p className=" h-60 w-96 para">{description}</p>

        </div>
      </div>
      <div className="flex row-auto space-x-2 justify-center">
        
        <Reaction reactions={reactions} />

  </div>
      
      <div className="ml-5 border-red-500 border-4 w-50">
      <h3 className="font">Ingredients 👇👇👇</h3>
      {ingredients.map((i) => (
        
         <Ingredient {...i} />

        
      ))}
      </div>

   
      <div className="mt-5">
        <h3 className="mb-5">Comment 👇👇👇</h3>
        {comments.map((c) => (

      <Comment {...c}/>
        ))}

      </div>
    </div>
  );
}
