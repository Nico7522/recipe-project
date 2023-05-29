import { useNavigate } from "react-router-dom";
import { deleteRecipe, updateValidity } from "../../../API/recipe";
import Button from "../Button";

export default function DuvRecipe({id, valid}) {
    const navigation = useNavigate()
    const changeStatus = updateValidity();
    const removeRecipe = deleteRecipe()
    const styleDisable = `bg-gray-300 text-white font-[Poppins] py-2 px-6 rounded  hover:bg-gray-400 
    duration-500`

  return (
    <div className="flex flex-row justify-center">
      <Button valid={!valid} styleDisable={styleDisable} disable={valid && true} onClick={() => changeStatus.mutate({id, validity: true})} text={"Valide"} />
      <Button valid={valid} styleDisable={styleDisable} disable={!valid && true} onClick={() => changeStatus.mutate({id, validity: false})} text={"Unvalide"} className={"bg-red-500"} />
      <Button onClick={() => removeRecipe.mutate(id)} text={"Delete"} className={"bg-red-400"} />
    </div>
  );
}
