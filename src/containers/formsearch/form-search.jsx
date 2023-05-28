import { FormProvider, useForm } from "react-hook-form";
import SearchBar from "../../components/searchbar/searchbar";
import FormInput from "../../components/form/form-input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import generateSearchParams from "../../../utils/generate-search-params";

export default function FormSearch() {
  const methods = useForm();
  const navigation = useNavigate();
  const handleSearch = ({name, tags}) => {
    
    let tabTags = [];
    tags.forEach((tag) => tabTags.push(tag.value));
    const nameParams = generateSearchParams("name", name);
    const tagsParams = generateSearchParams("tags", tabTags);
    console.log(tagsParams);
    const url = `/recipes/search?${nameParams || ""}&${tagsParams || ""}`;
    navigation(`/recipes/all/search?${nameParams}&${tagsParams}`);
  };
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col w-28 ml-2 " onSubmit={methods.handleSubmit(handleSearch)}>
        <SearchBar />
        <FormInput />
        <Button className={"z-10"} type={"submit"} text={"Search"} />
      </form>
    </FormProvider>
  );
}
