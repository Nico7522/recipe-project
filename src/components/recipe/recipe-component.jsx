import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { deleteRecipe } from "../../../API/recipe";
import Comment from "../comments/comment";
import Ingredient from "../ingredients/ingrediient";
import Reaction from "../reactions/reactions";
import { useId } from "react";
import CommentForm from "../comments/comment-form";

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
  userId,
}) {
  const { mutate } = deleteRecipe();
  comments.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateB;
  });

  comments = comments.slice(-3);

  const idP = useId();

  return (
    <div
      key={id}
      className="mx-auto w-10/12 shadow-2xl  bg-green-300 border-green-500 rounded-2xl relative mt-5 pb-3 pt-3 "
    >
      <h2 className="uppercase tracking-widest text-3xl text-center title underline">
        {name}
      </h2>
      <div className=" text-center w-1/4 flex flex-row justify-center m-auto ">
        <img
          src={"http://localhost:8080" + imgURL}
          className="rounded-2xl block m-auto shadow-md "
          alt=""
        />
        <div className="ml-2 rounded-2xl bg-green-700 shadow-lg mx-5 p-3">
          <h2 className="text-2xl font">Description</h2>
          <p className="  w-96 para description ">{description}</p>
        </div>
      </div>
      <div className="flex row-auto space-x-2 justify-center">
        <Reaction id={id} reactions={reactions} />
      </div>

      <div className="ml-5 bg-green-700 text-center  w-56 rounded-2xl">
        <h3 className="font">Ingredients 👇👇👇</h3>
        {ingredients.map((i) => (
          <Ingredient {...i} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-1/4">
          <h3 className="mb-5 bg-green-700 rounded-2xl  font  text-center">
            Comment 👇👇👇
          </h3>
          {comments.map((c) => (
            <Comment {...c} />
          ))}
        </div>
        <div className="flex flex-col m-auto w-96 items-center justify-center">
          <CommentForm id={id} />
        </div>
      </div>
    </div>
  );
}
