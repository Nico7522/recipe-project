import { useState } from "react";
import { Link } from "react-router-dom";

import Title from "../../components/title/title";
import { useFetchUser } from "../../hooks/user-hooks";
import Button from "../../components/button";

export default function AdminPanel() {
  const { userStatus } = useFetchUser();

  if (userStatus !== "Admin") {
    return <h2>Not authorized ! </h2>;
  }

  return (
    <>
      <Title className={"font 5xl md:mt-40"} text={"GESTION"} />
      <div className="flex flex-col md:flex-row justify-center items-center w-3/4 m-auto mt-32 p-10 bg-gray-700 rounded-md shadow-2xl text-3xl">
        <Link to="recipes">
          <Button
            text={"Recipes gestion"}
            style={"rounded-2xl"}
          ></Button>
        </Link>

        <Link to="comments" className="p-4 ">
          <Button
            text={"Comments gestion"}
            style={"rounded-2xl"}
          ></Button>
        </Link>

        <Link to="users">
          <Button text={"Users gestion"} style={"rounded-2xl"}></Button>
        </Link>
      </div>
    </>
  );
}
