import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Comment({
  id,
  text,
  userName,
  createdAt,
  update,
  setUpdate,
  handleComment,
}) {


  const navigation = useNavigate();
  const handleComm = (text, e) => {
    // navigation('/comment/'+id)
  };
  const handleEdit = (text, id) => {
    handleComment({text:text, id:id});
    setUpdate(true)
  };

  return (
    <div
      
      className="border-b-2 border-green-700"
    >
      <button onClick={() => handleEdit(text, id)}>EDIT</button>
     
    
      <span className="font">{userName ? userName : "Name not found"}</span>
      <span> [{createdAt}]</span>
      <p>{text}</p>
    </div>
  );
}
