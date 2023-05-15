import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/user-hooks";


export default function UserProfil({id, name, surname, email, birthdate, status, createdAt, avatar, recipes }) {
    const navigation = useNavigate()
    // const [userId] = useFetchUser()
    const [unAuthorized, setUnAuthorized] = useState('')
  const birthdateFormated = new Date(birthdate).toLocaleDateString("fr", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const creationDate = new Date(createdAt).toLocaleDateString("fr", {
    day: "numeric",
    month: "long",
    year: "numeric",
    
  });
  const creationDateTime = new Date(createdAt).toLocaleTimeString();
  const userId = useSelector(state => state.user.user.user.id)
  useEffect(() => {
      if (userId !== id) {
        console.log("userId =>", userId);
        console.log("id =>", id);
        setUnAuthorized(<h2 className="font text-center text-3xl text-red-700 ">Not autorized !</h2>) 
      }

  }, [])
  
 
  return (
    <>
    {unAuthorized !== '' ? unAuthorized : <div className="w-96 h-auto border-2 border-green-400 m-auto ">
      <h2 className="font text-center text-3xl ">User details </h2>
      <img src={"http://localhost:8080" + avatar} alt="avatar" width={100} height={100} className="block m-auto" />
      <h3 className="text-center text-2xl">Full name : </h3>{" "}
      <p className="text-center text-2xl border-2 border-green-200  bg-green-100 m-auto">
        {name} {surname}
      </p>
      <h3 className="text-center text-2xl">Mail : </h3>{" "}
      <p className="text-center text-2xl border-2 border-green-200 bg-green-100 m-auto">
        {email}
      </p>
      <h3 className="text-center text-2xl">Birthdate : </h3>{" "}
      <p className="text-center text-2xl border-2 border-green-200 bg-green-100 m-auto">
        {birthdateFormated}
      </p>
      <h3 className="text-center text-2xl">Status : </h3>{" "}
      <p className="text-center text-2xl border-2 border-green-200 bg-green-100 m-auto">
        {status}
      </p>
      <h3 className="text-center text-2xl">Creation date : </h3>{" "}
      <p className="text-center text-2xl border-2 border-green-200 bg-green-100 m-auto">
        {creationDate} {creationDateTime}
      </p>
      <h3 className="text-center text-2xl">Recipes : </h3>
      {recipes.map(r => (
        <h2 onClick={() => navigation('/recipes/' + r.id) } className="cursor-pointer text-center text-1xl border-2 border-green-200 bg-green-100 m-auto">{r.name}</h2>
      ))}
    </div>}
    </>
    
  );
}
