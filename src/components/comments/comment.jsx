import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button";
import { deleteComment } from "../../../API/comment";
import { useFetchUser } from "../../hooks/user-hooks";

export default function Comment({
  id,
  text,
  userName,
  creatorId,
  createdAt,
  update,
  setUpdate,
  handleComment,
  setCommentDeleted,
}) {
  const { userId } = useFetchUser();
  const deleteCom = deleteComment();
  const navigation = useNavigate();
  const handleDeleteComment = (id) => {
    deleteCom.mutate(id);
    setCommentDeleted(true);
    setTimeout(() => {
      setCommentDeleted(false);
    }, 2000);
  };
  const handleEdit = (text, id) => {
    handleComment({ text: text, id: id });
    setUpdate(true);
  };

  return (
    <div className="border-b-2 border-green-700">
      <div className="flex flex-row items-center w-96">
        <span className="font mt-1 mr-1">
          {userName ? userName : "Name not found"}
        </span>
        <span> [{createdAt}]</span>

        {userId === creatorId && (
          <>
            <Button
              className="ml-2 w-6 h-6 text-center !py-0 !px-0"
              onClick={() => handleEdit(text, id)}
              text={"🧨"}
            />
            <Button
              className="ml-2 w-6 h-6 text-center !py-0 !px-0 bg-red-300"
              onClick={() => handleDeleteComment(id)}
              text={"❌"}
            />
          </>
        )}
      </div>

      <p>{text}</p>
    </div>
  );
}
