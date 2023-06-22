import { FormProvider, set, useForm } from "react-hook-form";
import IngredientsForm from "../../components/form/ingredients-form";
import TagsForm from "../../components/form/tags-form";
import { formArrayRecipe } from "../../../utils/formdatarecipe";
import { useFetchUser } from "../../hooks/user-hooks";
import { postRecipe } from "../../../API/recipe";
import Button from "../../components/button";
import ConfirmModal from "../../components/modal/confirm-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RecipeForm() {
  const nav = useNavigate()
  const [toogleModal, setToogleModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({});
  const { userId } = useFetchUser();
  const recipe = postRecipe();
  const methods = useForm();

  const handleRecipe = (data) => {
    setToogleModal(true);
    const arraySorted = formArrayRecipe(data);
    setNewRecipe({
      name: data.name,
      description: data.description,
      ingredients: arraySorted.ingredientsArray,
      tags: arraySorted.tagsArray,
      UserId: userId,
    });
  };
  const sendRecipe = () => {
    console.log(newRecipe);
    recipe.mutate(newRecipe);
    setToogleModal(false)
    methods.reset();
  };

if (recipe.isSuccess) {
  return <div>
    <h2 className="text-green-300 font text-2xl">Recipe created ! </h2>
    {setTimeout(() => {
      nav('/recipes/all')
    }, 2000)}
  </div>
}

  return (
    <div className="w-3/4 m-auto border-4 border-green-800">
    
      <ConfirmModal
        toogleModal={toogleModal}
        setToogleModal={setToogleModal}
        sendRecipe={sendRecipe}
      />
      <FormProvider {...methods}>
        <form
          className="flex flex-col text-center"
          onSubmit={methods.handleSubmit(handleRecipe)}
        >
          <label className="text-white font text-2xl" htmlFor="name">
            Recipe name :{" "}
          </label>
          <input
            className="w-96 m-auto"
            type="text"
            {...methods.register("name")}
          />
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
