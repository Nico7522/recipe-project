import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetchUser } from "../../hooks/user-hooks.js";
import { disconnectAction, logoutAction } from "../../store/actions/user.action.js";
const URL_IMG_API = import.meta.env.VITE__URL_IMG_API;
const DOMAINE = import.meta.env.VITE__DOMAINE;
const URL_API = import.meta.env.VITE__URL_API;
import UserProfil from "../profil/profil";
import Button from "../button.jsx";
import axios from "axios";
import { userLogout } from "../../../API/POST/user.js";

const NavBar = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const { token, userId, avatar, fullName, config } = useFetchUser();
  const [isToken, setIsToken] = useState(null)
 

  useEffect(() => {
    setIsToken(token)
  }, [token])
  const logOut = () => {
    setIsToken(null)
    userLogout({userId, config})
    dispatch(disconnectAction());
    navigation('/user/logout')
    
  }
  const darkMode = () => {
    localStorage.theme === "dark"
      ? localStorage.removeItem("theme")
      : localStorage.setItem("theme", "dark");

    location.reload();
  };
  let Links = [
    { name: "HOME", link: "/" },
    { name: "RECIPES", link: "/recipes/all" },
    { name: "INGREDIENTS", link: "/ingredients" },
    { name: "RECIPES OF THE WEEKS", link: "/recipes/top" },
    { name: "CONTACT", link: "/contact" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full">
      <div className=" md:flex items-center justify-between bg-white py-4 md:px-10 px-7 dark:bg-black dark:border-b-green-300 dark:border-b-2">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-3xl text-green-300 mr-1 pt-2 ">
            <ion-icon name="fast-food"></ion-icon>
          </span>
          <span className="dark:text-white" >Recipe</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white dark:bg-black dark:text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500 dark:text-white"
              >
                {link.name}
              </a>
            </li>
          ))}
          {isToken !== null ?(
            <div className=" relative mb-2 ml-3 md:-mb-3 md:ml-5 md:text-center md:w-18 md:m-auto md:flex md:flex-col md:justify-center md:items-center md:border-2 md:border-green-300">
              <div className="absolute top-0 right-1" onClick={() => logOut()}>
                {" "}
                <Link>
                  <ion-icon name="log-out"></ion-icon>
                </Link>
              </div>
              <Link to={"/user/profil/" + userId}>
                <img
                  src={`${URL_IMG_API}${avatar}`}
                  width="50"
                  height="30"
                  className="rounded-2xl"
                />
              </Link>
              <span className=" mt-1 para">{fullName}</span>
            </div>
          ) : (
            <div className="flex flex-col break-words relative mb-7 lg:mb-0">
            <Link to="/user/signin">
              <Button text={"LOG IN"} className={"btn ml-1"}></Button>
            </Link>
            <p onClick={() => navigation('/user/forgotpassword')} className="text-xs top-9 lg:top-14 xl:top-9 lg:w-32 md:top-16 min-[1150px]:top-9 left-2 absolute w-30 hover:underline hover:cursor-pointer">Forgot password ?</p>
            </div>
          )}
          
          <Link to="/user/signup">
            {" "}
            <Button text={"REGISTER"} className={"btn"}></Button>
          </Link>
        <button
          onClick={() => darkMode()}
          className={`${localStorage.theme === "dark" ? 'bg-yellow-200' : "bg-black text-white" } w-12 rounded-2xl ml-2 -mr-7`}
        >
         {localStorage.theme === "dark" ? <ion-icon name="sunny"></ion-icon> : <ion-icon name="moon"></ion-icon>}
        </button>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
