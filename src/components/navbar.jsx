import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFetchUser } from "../hooks/user-hooks";
import { logoutAction } from "../store/actions/user.action";
import Button from "./Button";
import UserProfil from "./profil/profil";

const NavBar = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const { token, userStatus, userId, avatar, fullName } = useFetchUser();
  const [isToken, setIsToken] = useState(null)
  useEffect(() => {
    setIsToken(token)
  }, [token])
  const logOut = () => {
    setIsToken(null)
    dispatch(logoutAction())
    navigation('/')
  }
  let Links = [
    { name: "HOME", link: "/" },
    { name: "RECIPES", link: "/recipes" },
    { name: "INGREDIENTS", link: "/" },
    { name: "RECIPES OF THE WEEKS", link: "/recipes/top" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full">
      <div className=" md:flex items-center justify-between bg-white py-4 md:px-10 px-7 dark:bg-black dark:shadow-green-300 dark:shadow-2xl">
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
            <div className=" relative mb-2 ml-3 md:-mb-3 md:ml-5 md:text-center md:w-18 md:m-auto md:flex md:flex-col md:justify-center md:items-center md:border-4 md:border-green-300">
              <div className="absolute top-0 right-1" onClick={() => logOut()}>
                {" "}
                <Link>
                  <ion-icon name="log-out"></ion-icon>
                </Link>
              </div>
              <Link to={"/user/profil/" + userId}>
                <img
                  src={"http://localhost:8080/" + avatar}
                  width="50"
                  height="30"
                />
              </Link>
              <span className=" mt-3 para">{fullName}</span>
            </div>
          ) : (
            <Link to="/user/signin">
              <Button text={"LOG IN"} className={"btn ml-1"}></Button>
            </Link>
          )}

          <Link to="/user/signup">
            {" "}
            <Button text={"REGISTER"} className={"btn ml-3"}></Button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
