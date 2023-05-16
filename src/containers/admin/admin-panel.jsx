import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Title from "../../components/title/title";
import { useFetchUser } from "../../hooks/user-hooks";

export default function AdminPanel() {


    const {userStatus} = useFetchUser()

    if (userStatus !== "Admin") {
        return <h2>Not authorized ! </h2>
    }


  return (
    <div className="flex flex-col m-auto w-56 text-center  text-5xl" >
        <Title style={"font 5xl mt-0"} text={"GESTION"} />
      <Link to="recipes" className="w-56 m-auto">
        <Button text={"Recipes gestion"} style={"rounded-2xl m-auto"}></Button>
      </Link>

      <Link to="comments" className="w-56 m-auto -ml-7 ">
        <Button text={"Comments gestion"} style={"rounded-2xl m-auto"}></Button>
      </Link>

      <Link to="users" className="w-56 m-auto">
        <Button text={"Users gestion"} style={"rounded-2xl m-auto"}></Button>
      </Link>
    </div>
  );
}
