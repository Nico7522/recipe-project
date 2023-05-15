import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchUser } from "../hooks/user-hooks";
import Button from "./Button";
import UserProfil from "./profil/profil";

const NavBar = () => {
  const [token, userStatus, userId, avatar, fullName] = useFetchUser();
  let Links = [
    { name: "HOME", link: "/" },
    { name: "RECIPES", link: "/recipes" },
    { name: "INGREDIENTS", link: "/" },
    { name: "RECIPES OF THE WEEKS", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-3xl text-green-300 mr-1 pt-2">
            <ion-icon name="fast-food"></ion-icon>
          </span>
          Recipes
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          {token !== null ? (
            <Link to={"/user/profil/" + userId}>
            <div className="mb-2 ml-3 md:-mb-3 md:ml-5 md:text-center md:w-18 md:m-auto md:flex md:flex-col md:justify-center md:items-center md:border-4 md:border-green-300">
              <img src={"http://localhost:8080/" + avatar} width="50" height="30" />
              <span className=" mt-3 para">{fullName}</span>
            </div>
            
            </Link>
          ) : (
            <Link to="/user/signin">
              <Button text={"LOG IN"} style={"btn"}></Button>
            </Link>
          )}
     

          <Link to="/user/signup">
            {" "}
            <Button text={"REGISTER"} style={"btn"}></Button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
