import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../API/connexion";
import { useFetchUser } from "../../hooks/user-hooks";
import Button from "../button";

export default function UserProfil({
  id,
  name,
  surname,
  email,
  birthdate,
  status,
  createdAt,
  avatar,
  recipes,
}) {
  const navigation = useNavigate();
  const { userId, userStatus } = useFetchUser();
  const [unAuthorized, setUnAuthorized] = useState(false);
  const [resetPsw, setResetPsw] = useState(false);
  const [pswReset, setPswReset] = useState("");
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
  useEffect(() => {
    if (userId === id || userStatus === "Admin") {
      setUnAuthorized(true);
    }
  }, [userId]);
  const textResetPsw = pswReset === -1 ? <span className="text-red-500 m-auto">Password must be different !</span> : ( pswReset == 0 ?<span className="text-red-500">Password doesn\'t not match the requirements !</span> : <span className="text-green-500">Password changed ! </span> );

  const { register, handleSubmit } = useForm();
  const handleResetPsw = async ({ password }) => {
    const isPswReset = await resetPassword(userId, password);
    setPswReset(isPswReset);
    console.log("isPswReset", isPswReset);
  };

  return (
    <>
      {unAuthorized === false ? (
        <h2 className="font text-center text-3xl text-red-700 ">
          Not autorized !
        </h2>
      ) : (
        <div className="w-96 h-auto border-2 border-green-400 mt-32 md:mt-40 m-auto ">
          <h2 className="font text-center text-3xl text-white ">User details </h2>
          <img
            src={"http://localhost:8080" + avatar}
            alt="avatar"
            width={100}
            height={100}
            className="block m-auto"
          />
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
            {createdAt}
          </p>
          <h3 className="text-center text-2xl">Recipes : </h3>
          {recipes.map((r) => (
            <h2
              onClick={() => navigation("/recipes/" + r.id)}
              className="cursor-pointer text-center text-1xl border-2 border-green-200 bg-green-100 m-auto"
            >
              {r.name}
            </h2>
          ))}
      <div className="w-96 m-auto mt-5 text-center ">
        <Button
          style={"mr-8"}
          onClick={() => setResetPsw(!resetPsw)}
          text={"RESET PASSWORD ?"}
        />
      </div>
      {resetPsw && (
        <div className="w-96 m-auto mt-5 ">
          <form
            onSubmit={handleSubmit(handleResetPsw)}
            className="flex flex-col justify-center items-center	"
          >
            <label htmlFor="password">Reset password</label>
            <input {...register("password")} type="password" />
            <Button style={"mr-8"} text={"RESET"} />
          </form>
          {pswReset !== '' &&( <div className="text-center font">{textResetPsw}</div> )}
        </div>
      )}
        </div>
      )}
    </>
  );
}
