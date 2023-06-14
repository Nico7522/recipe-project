import { FormProvider, useForm } from "react-hook-form";
import IngredientsForm from "../../components/form/ingredients-form";
import TagsForm from "../../components/form/tags-form";
import { formArrayRecipe } from "../../../utils/formdatarecipe";
import { useFetchUser } from "../../hooks/user-hooks";
import { postRecipe } from "../../../API/recipe";
import Button from "../../components/button";
import ConfirmModal from "../../components/modal/confirm-modal"
import { useState } from "react";
export default function RecipeForm() {
  const [toogleModal, setToogleModal] = useState(false)
  const { userId } = useFetchUser();
  const recipe = postRecipe();
  const methods = useForm();
  let newRecipe;
  const handleRecipe = (data) => {
    setToogleModal(true)
    const arraySorted = formArrayRecipe(data);
      newRecipe = {
      name: data.name,
      description: data.description,
      ingredients: arraySorted.ingredientsArray,
      tags: arraySorted.tagsArray,
      UserId: userId,
    };
  
  };
  const sendRecipe = () => {
    recipe.mutate(newRecipe);
    methods.reset()
  }
  return (
    <div className="w-3/4 m-auto border-4 border-green-800">
      <ConfirmModal toogleModal={toogleModal} setToogleModal={setToogleModal} sendRecipe={sendRecipe} />
      <FormProvider {...methods}>
        <form
          className="flex flex-col text-center"
          onSubmit={methods.handleSubmit(handleRecipe)}
        >
          <label className="text-white font text-2xl" htmlFor="name">
            Recipe name :{" "}
          </label>
          <input className="w-96 m-auto" type="text" {...methods.register("name")} />
          <label className="text-white font text-2xl" htmlFor="description">
            Description :{" "}
          </label>

          <textarea
            {...methods.register("description")}
            id=""
            cols="30"
            rows="10"
            className="w-96 m-auto h-60 rounded-lg shadow-2xl resize-none"
          ></textarea>
          <TagsForm />
          <IngredientsForm />
          <Button className={"w-72 m-auto"} type={"submit"} text={"Search"} />
        </form>
      </FormProvider>
    </div>
  );
}