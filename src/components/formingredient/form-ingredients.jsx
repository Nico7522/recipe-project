import axios from "axios";
import { useForm, useFormContext } from "react-hook-form";
import Button from "../button";
import { useState } from "react";
import { useFetchIngredient } from "../../../API/ingredient";

export default function IngredientsForm() {
  const [tabData, setTabData] = useState([]);
  // const [tabIngredient, setTabIngredient] = useState([])
  const handleIngredient = (ingre) => {
    setTabData((prevIngre) => [...prevIngre, ingre]);
  };

  const { register } = useFormContext();
  return (
    <div className="z-10 border-4 break-words border-green-600">
      <SearchIngredient handleIngredient={handleIngredient} />
      <form className="-ml-2 text-center  break-words">
        <h3 className="font text-white  text-center w-20 ml-1 sm:ml-5">Selected ingredient</h3>
        {tabData.map((i) => (
          <div className="z-10 text-center ml-2 border-b-2 border-b-black">
            <label className=" text-white" >{i.name}</label>
            <input className="" {...register(`${i.name}`)} type="checkbox"/>
          </div>
        ))}
      </form>
    </div>
  );
}

const SearchIngredient = ({ handleIngredient }) => {
  const [ingredient, setIngredient] = useState("");
  const { data } = useFetchIngredient();

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/api/ingredient", { params: { ingredient: ingredient}})
      .then(({ data }) =>
        handleIngredient({ name: data.results[0].name, id: data.results[0].id })
      );
  };

  return (
    <div className="text-center m-auto">
      <form>
        <label htmlFor="ingredient" className="text-white break-words">Search ingredients</label>
        <input
        className="w-24 max-w-full"
          value={ingredient}
          type="text"
          onChange={(e) => setIngredient(e.target.value)}
        />
      </form>
      <Button className={'text-xs max-w-full'} text={"Find ingredient"} onClick={(e) => handleSearch(e)} />
    </div>
  );
};


