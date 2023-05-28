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
import { useNavigate } from "react-router-dom";
import { useCalcMacro } from "../../hooks/macro-hooks";
import ShowTags from "../../../utils/show-tags";

// + " " + (!showComment && "h-12 break-words overflow-scroll")
export default function Recipe({
  id,
  name,
  imgURL,
  description,
  ingredients,
  tags,
  comments,
  reactions,
  creatorId,
  userStatus,
  userId,
  handleSearchTag
}) {
  const [showComment, setShowComment] = useState(
    isNaN(window.location.href.slice(-1))
  );
  const {macro} = useCalcMacro(ingredients)
  const { mutate } = deleteRecipe();



  let tabMacro = [];
  ingredients.forEach(macro => {
    tabMacro.push(macro)
  });

  if (isNaN(window.location.href.slice(-1))) {
    comments = comments.slice(-3);
  }

  const idP = useId();
  const navigation = useNavigate();
  const goToDetails = (id) => {
    navigation("/recipes/" + id);
  };

  const handle = (t) => {
   handleSearchTag(t)
  }

  return (
    <div
      key={id}
      className="mx-auto w-10/12 shadow-2xl  bg-green-300 border-green-500 rounded-2xl relative mt-5 pb-3 pt-3 "
    >
      <h2
        onClick={() => goToDetails(id)}
        className="uppercase tracking-widest w-60 m-auto text-3xl text-center title underline cursor-pointer"
      >
        {name}
      </h2>
      <div className="text-center w-1/4 flex flex-row justify-center m-auto ">
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

    <div className="flex flex-row space-x-36 items-center justify-center m-auto w-3/4 mb-5">

    
      <div className="ml-5 bg-green-700 text-center w-96 rounded-2xl pb-2">
        <h3 className="font">Ingredients 👇👇👇</h3>
        {ingredients.map((i) => (
          <Ingredient {...i} tabMacro={tabMacro} />
        ))}
      <div className="bg-green-800 text-lime-50 w-96 m-auto rounded-2xl shadow-2xl">
      <h3>Total : {macro.kcals} kcals</h3>
      <p>Carbohydrates : {macro.carbohydrates} g</p>
      <p>Fats : {macro.fats} g</p>
      <p>proteins : {macro.proteins} g</p>

      </div>
      </div>
      <div className="flex flex-col bg bg-green-800 text-lime-50 w-60 m-auto rounded-2xl shadow-2xl">
      {tags.map((t) => (
        <h3 onClick={() => handle(t)} className="text-white text-2xl text-center cursor-pointer">{ShowTags(t)}</h3>
      ))}

      </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-1/4">
          <h3 className="mb-5 bg-green-700 rounded-2xl  font  text-center">
            Comment 👇👇👇
          </h3>
          <div className={!showComment && "h-40 overflow-y-scroll scrollbar scrollbar-thumb-rounded-md scrollbar-thumb-green-700 scrollbar-track-gray-100 scrollbar-w-2"}>
            {comments.map((c) => (
              <Comment {...c} />
            ))}
          </div>
        </div>
        <div className="flex flex-col m-auto w-96 items-center justify-center">
          <CommentForm id={id} />
        </div>
      </div>
    </div>
  );
}
