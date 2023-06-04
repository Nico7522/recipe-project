import { Outlet } from "react-router-dom";
import SearchBar from "../../components/searchbar/searchbar";
import FormSearch from "../../containers/formsearch/form-search";
import { useEffect, useState } from "react";
import Button from "../../components/button";

export default function AllRecipesPage() {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
    const [show, setShow] = useState(false)
  
   
  return (
    <div className={`md:mt-36 lg:mt-40 xl:mt-0`}>
      <div className={`transition-all duration-200 ease-in ${(currentWidth < 380) && show === false ? "-ml-96" : "ml-0"}`} >
        <FormSearch />
      </div>
        {window.innerWidth < 380 && <Button onClick={() => setShow(!show)} className={"ml-2"}  text={"🔍"}/>}
      <div className="-mt-40">
        <Outlet />
      </div>
    </div>
  );
}
