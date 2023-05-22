import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Title from "../../components/title/title";
import { useFetchUser } from "../../hooks/user-hooks";

export default function AdminPanel() {
  const { userStatus } = useFetchUser();

  if (userStatus !== "Admin") {
    return <h2>Not authorized ! </h2>;
  }

  return (
    <>
    
      <Title className={"font 5xl md:mt-40"} text={"GESTION"} />
    <div className="flex flex-row justify-center items-center w-2/4 m-auto mt-32 p-10 bg-gray-700 rounded-md shadow-2xl text-3xl">
      <Link to="recipes" className="w-56 m-auto p-4">
        <Button text={"Recipes gestion"} style={"rounded-2xl m-auto"}></Button>
      </Link>

      <Link to="comments" className="w-56 m-auto p-4 ">
        <Button text={"Comments gestion"} style={"rounded-2xl m-auto"}></Button>
      </Link>

      <Link to="users" className="w-56 p-4 m-auto">
        <Button text={"Users gestion"} style={"rounded-2xl m-auto "}></Button>
      </Link>
    </div>
    </>

  );
}
