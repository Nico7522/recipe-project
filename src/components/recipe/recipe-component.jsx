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
import ImageForm from "../image-form/image-form";

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
  handleSearchTag,
}) {
  const [update, setUpdate] = useState(false);

  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(
    isNaN(window.location.href.slice(-1))
  );
  const { macro } = useCalcMacro(ingredients);
  const { mutate } = deleteRecipe();

  let tabMacro = [];
  ingredients.forEach((macro) => {
    tabMacro.push(macro);
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
    handleSearchTag(t);
  };
  // const onUpdate = (val) => {
  //   setUpdate(val)
  // }
  const handleComment = (fullComment) => {
    setComment(fullComment);
  };

  return (
    <div
      key={id}
      className="mx-auto w-10/12 shadow-2xl bg-green-300 border-green-500 rounded-2xl relative mt-5 pb-3 pt-3 "
    >
      <h2
        onClick={() => goToDetails(id)}
        className="uppercase tracking-widest max-w-60 m-auto text-3xl text-center title underline cursor-pointer overflow-hidden break-words"
      >
        {name}
      </h2>
      <div className="text-center flex flex-col lg:flex-row">
        <img
          src={"http://localhost:8080" + imgURL}
          width={250}
          
          className="rounded-2xl m-auto shadow-md "
          alt=""
        />
        {console.log(!isNaN(window.location.href.slice(-1)))}
        {userId === creatorId && !isNaN(window.location.href.slice(-1)) && <ImageForm id={id} />}
        <div className="rounded-2xl bg-green-700 shadow-lg sm:mt-2 p-3 mt-2 sm:w-96 sm:m-auto lg:-ml-12 xl:-ml-28">
          <h2 className="text-2xl font">Description</h2>
          <p className="para description overflow-hidden break-words ">{description}</p>
        </div>
      </div>
      <div className="flex row-auto space-x-2 justify-center">
        <Reaction id={id} reactions={reactions} />
      </div>

      <div className="lg:flex lg:flex-row sm:flex-col m-auto">
        <div className=" bg-green-700 text-center rounded-2xl pb-2 sm:w-72 md:w-80 m-auto lg:mr-3">
          <h3 className="font">Ingredients 👇👇👇</h3>
          {ingredients.map((i) => (
            <Ingredient {...i} tabMacro={tabMacro} />
          ))}
          <div className="bg-green-800 text-lime-50  m-auto rounded-2xl shadow-2xl sm:w-72 md:w-80">
            <h3>Total : {macro.kcals} kcals</h3>
            <p>Carbohydrates : {macro.carbohydrates} g</p>
            <p>Fats : {macro.fats} g</p>
            <p>proteins : {macro.proteins} g</p>
          </div>
        </div>
        <div className="flex flex-col bg bg-green-800 text-lime-50 sm:w-72 mt-2  m-auto rounded-2xl shadow-2xl">
          {tags.map((t) => (
            <h3
              onClick={() => handle(t)}
              className="text-white text-2xl text-center cursor-pointer"
            >
              {ShowTags(t)}
            </h3>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-1/4">
          <h3 className="mb-5 mt-2 bg-green-700 rounded-2xl  font  text-center">
            Comment 👇👇👇
          </h3>
          <div
            className={
              !showComment &&
              "h-40 overflow-y-scroll scrollbar scrollbar-thumb-rounded-md scrollbar-thumb-green-700 scrollbar-track-gray-100 scrollbar-w-2"
            }
          >
            {comments.map((c) => (
              <Comment
                update={update}
                setUpdate={setUpdate}
                handleComment={handleComment}
                {...c}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col m-auto  items-center justify-center">
          <CommentForm
            commId={comment.id}
            update={update}
            handleComm={handleComment}
            setUpdate={setUpdate}
            id={id}
            comment={comment}
          />
        </div>
      </div>
    </div>
  );
}
