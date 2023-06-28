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
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorInputDispay from "../../components/responses/error-input-display";

import * as yup from "yup";
import Title from "../../components/title/title";
export default function RecipeForm() {
  const schema = yup.object().shape({
    name: yup.string().max(25).required("Required field"),
    description: yup.string().required("Required field !"),
    tags: yup
      .array()
      .of(
        yup.object({
          label: yup.string(),
          value: yup.string(),
        })
      )
      .test('tags', 'At least one tags !', (tab) => {
        if (Array.isArray(tab)) {
          if (tab.length > 0) {
            return true
          }
        } 
        return false
      }),
    ingredients: yup.array().of(
      yup.object({
        label: yup.string(),
        value: yup.string(),
      })
    )
    .test('ingredients', 'At least one ingredient !', (tab) => {
      if (Array.isArray(tab)) {
        if (tab.length > 0) {
          return true
        }
      } 
      return false
    })
  
  });
  const nav = useNavigate();
  const [toogleModal, setToogleModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({});
  const { userId } = useFetchUser();
  const recipe = postRecipe();
  const methods = useForm({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

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
    setToogleModal(false);
    methods.reset();
  };

  if (recipe.isSuccess) {
    return (
      <div>
        <h2 className="text-green-300 font text-2xl text-center">
          Recipe created !{" "}
        </h2>
        {setTimeout(() => {
          nav("/recipes/all");
        }, 2000)}
      </div>
    );
  }

  return (
    <>
      <Title text={'CREATE RECIPE'} className={'md:mt-36'}/>
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
            className="md:w-96 m-auto"
            type="text"
            {...methods.register("name")}
          />
          {methods.formState.errors.name && (
            <ErrorInputDispay errors={methods.formState.errors} name={"name"} />
          )}
          <label className="text-white font text-2xl" htmlFor="description">
            Description :{" "}
          </label>
          {methods.formState.errors.description && (
            <ErrorInputDispay
              errors={methods.formState.errors}
              name={"description"}
            />
          )}

          <textarea
            {...methods.register("description")}
            id=""
            cols="30"
            rows="10"
            className="md:w-96 m-auto h-60 rounded-lg shadow-2xl resize-none"
          ></textarea>
          <TagsForm />
          {methods.formState.errors.tags && (
            <ErrorInputDispay errors={methods.formState.errors} name={"tags"} />
          )}

          <IngredientsForm />
          {methods.formState.errors.ingredients && (
            <ErrorInputDispay errors={methods.formState.ingredients} name={"ingredients"} />
          )}
          <Button className={"w-72 m-auto"} type={"submit"} text={"Create"} />
        </form>
      </FormProvider>
    </div>
    </>
  );
}
