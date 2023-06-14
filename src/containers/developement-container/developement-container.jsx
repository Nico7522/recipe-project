// import axios from "axios";
// import qs from "qs";
// import Button from "../../../components/button";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";
import IngredientsForm from "./form/ingredients-form";
import TagsForm from "./form/tags-form";
import Button from "../../components/button";
import { useFetchUser } from "../../hooks/user-hooks";
import { postRecipe } from "../../../API/recipe";
import { formArrayRecipe } from "../../../utils/formdatarecipe";

// export default function DevelopmentContainer(){
//     const [value, setValue] = useState('')
//     const navigation = useNavigate()

//     const handleSearch = (e) => {
//         e.preventDefault()
//         console.log(value);
//         axios.get('http://localhost:8080/api/search', {
//             params: {
//                 name: value
//             },
//              paramsSerializer: param => { return qs.stringify(param)}}).then(r => console.log(r))

//              navigation("/admin/development", { state: value });
//     }
//     return (
//         <>
//         <h1 className="text-white text-center text-2xl">TEST DEVELOPMENT</h1>

//         <form onSubmit={handleSearch}>
//             <label htmlFor="search">search</label>
//             <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
//             <Button text={"SEARCH"}/>
//         </form>
//         </>
//     )
// }

export default function DevelopmentContainer() {
  const { userId } = useFetchUser();
  const recipe = postRecipe();
  const methods = useForm();
  const handleRecipe = (data) => {
    const arraySorted = formArrayRecipe(data);
    const newRecipe = {
      name: data.name,
      description: data.description,
      ingredients: arraySorted.ingredientsArray,
      tags: arraySorted.tagsArray,
      UserId: userId,
    };
    recipe.mutate(newRecipe);
    methods.reset()
  };
  return (
    <div className="w-3/4 m-auto border-4 border-green-800">
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
