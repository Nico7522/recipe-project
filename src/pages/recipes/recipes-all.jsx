import { Outlet } from "react-router-dom";
import SearchBar from "../../components/searchbar/searchbar";
import FormSearch from "../../containers/formsearch/form-search";
import { useEffect, useState } from "react";
import Button from "../../components/button";

export default function AllRecipesPage() {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
    const [show, setShow] = useState(false)
  
   
  return (
    <div className={`md:mt-36 lg:mt-40 xl:mt-56 relative`}>
      <div className={`absolute top-18 sm:top-1 md:top-20 lg:top-30 xl:top-14 transition-all duration-200 ease-in ${(currentWidth < 380) && show === false ? "-ml-96" : "ml-0"}`} >
        <FormSearch />
      </div>
      <div className="relative">
        {window.innerWidth < 380 && <Button onClick={() => setShow(!show)} className={"ml-2 mt-96 absolute h-7 w-7 flex justify-center items-center left-44  -top-72"}  text={"🔍"}/>}

      </div>
      <div className="mt-40 xl:-mt-40">
        <Outlet />
      </div>
    </div>
  );
}
