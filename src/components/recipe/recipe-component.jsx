import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";


export default function Recipe({
  id,
  name,
  description,
  ingredients,
  reactions,
}) {
  console.log(reactions);
  let like = 0;
  let tasty = 0;
  let dislike = 0;
  reactions.forEach((r) => {
    if (r.reaction === "like") {
      like += 1;
    }
    if (r.reaction === "tasty") {
      tasty += 1;
    }
    if (r.reaction === "dislike") {
      dislike += 1;
    }
  });

  return (
    <div
      key={id}
      className="mx-auto mt-5 w-10/12 border-4 bg-white border-indigo-500/100 text-center rounded-2xl "
    >
      <h2 className="uppercase tracking-widest text-5xl bg-red-50">{name}</h2>
      <div className="w-1/4 flex flex-row justify-center m-auto">
        <img src="http://localhost:8080/images/recipe/recipedefault.jpg" className="rounded-2xl block m-auto " alt="" />
        <div className=" h-60 border-4 border-red-300 ">
            <h2 className="text-2xl">Description</h2>
        <p className=" h-60 w-96 para">{description}</p>

        </div>
      </div>
      
      
      {ingredients.map((i) => (
        <div>
          <p>{i.name}</p>
          <p> Calories : {i.calories}</p>
          <p> Proteins : {i.proteins}</p>
          <p> Fats : {i.fats}</p>
          <p> Carbohydrates : {i.carbohydrates}</p>
        </div>
      ))}
      <div className="flex row-auto space-x-2 justify-center">
        <p>❤ : {like}</p>
        <p>🤤 : {tasty}</p>
        <p>👎 : {dislike}</p>
      </div>
    </div>
  );
}
