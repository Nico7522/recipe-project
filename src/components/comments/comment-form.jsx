import { useForm } from "react-hook-form";
import {
  postComment,
  updateComment,
  useFetchCommentById,
  useFetchComments,
} from "../../../API/comment";
import { useFetchUser } from "../../hooks/user-hooks";

import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../button";

export default function CommentForm({
  id,
  setUpdate,
  update,
  comment,
  handleComm,
  commId,
  commentDeleted
}) {
  const upComment = updateComment();
  const [isOnUpdate, setIsOnUpdate] = useState(false);
  // const [commentDeleted, setCommentDeleted] = useState(false);
  const [updateFullified, setUpdateFullified] = useState(false);
  const { userId } = useFetchUser();

  const { mutate, error } = postComment();
  const { data } = useFetchComments();

  const { register, handleSubmit, setValue, reset } = useForm();
  const handleComment = (data) => {
    if (update === false) {
      const comment = {
        text: data.comment,
        UserId: userId,
        RecipeId: id,
      };

      mutate(comment);
      reset()
    }
    if (update) {
      upComment.mutate({ idComment: commId, text: data.comment });
      setUpdateFullified(true);
      handleComm("");
      setUpdate(false);
      setTimeout(() => {
        setUpdateFullified(false);
      }, 2000);
    }
  };
  useEffect(() => {
    setValue("comment", comment.text);
  }, [comment]);
  const handleCancelEdit = () => {
    setUpdate(false);
    handleComm("");
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(handleComment)}
    >
      <div className="text-center p-2">
        <label htmlFor="comment"></label>

        <textarea
          {...register("comment")}
          id=""
          cols="10"
          rows="5"
          className=" w-36 sm:w-96 rounded-lg shadow-2xl resize-none"
          placeholder="Your comment..."
        ></textarea>
      </div>
      {error && userId && <span className="text-red-500">Error ! </span>}
      {error && !userId && (
        <span className="text-red-500">You must be logged !</span>
      )}
      {update === false ? (
        <Button className={"bg-green-500"} type={"submit"} text={"POST"} />
      ) : (
        <Button className={"bg-green-500"} type={"submit"} text={"EDIT"} />
      )}
      {update && <button onClick={() => handleCancelEdit()}>CANCEL</button>}
      {updateFullified && <p className="text-green-800">Comment updated !</p>}
      {commentDeleted && <p className="text-red-800">Comment deleted !</p>}
    </form>
  );
}
