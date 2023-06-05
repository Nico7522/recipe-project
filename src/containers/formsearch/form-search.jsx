import { FormProvider, useForm } from "react-hook-form";
import SearchBar from "../../components/searchbar/searchbar";
import FormInput from "../../components/form/form-input";
import { useNavigate } from "react-router-dom";

import generateSearchParams from "../../../utils/generate-search-params";
import Button from "../../components/button";
import IngredientsForm from "../../components/formingredient/form-ingredients";

export default function FormSearch() {
  const methods = useForm();
  const navigation = useNavigate();
  const handleSearch = (data) => {
    let tabIngredients = [];
    for (const i in data) {
      if (data[i] === true) {
        tabIngredients.push(i);
      }
    }
    console.log(tabIngredients);

    let tabTags = [];
    if (data.tags) {
      data.tags.forEach((tag) => tabTags.push(tag.value));
      
    }
 
    const nameParams = generateSearchParams("name", data.name);
    const tagsParams = generateSearchParams("tags", tabTags);
    console.log('tagsParam', tagsParams);
    const ingredientsParam = generateSearchParams("ingredients", tabIngredients)
    console.log(tagsParams);
    const url = `/recipes/all/search?${data.name && nameParams || ''}&${tagsParams || ''}&${ingredientsParam || ""}`;
    navigation(url);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-20 sm:w-28 ml-2 "
        onSubmit={methods.handleSubmit(handleSearch)}
      >
        <SearchBar />
        <FormInput />
        <IngredientsForm />
        <Button className={"z-10"} type={"submit"} text={"Search"} />
      </form>
    </FormProvider>
  );
}
