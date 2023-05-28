import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "../Button";

import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../form/form-input";
import generateSearchParams from "../../../utils/generate-search-params";

export default function SearchBar({ className }) {
  // const { register, handleSubmit } = useForm();
  const navigation = useNavigate();
  const methods = useForm();
  // const handleSearch = (data) => {
  //   const searchParams = new URLSearchParams();
  //   searchParams.append("name", "jean");
  //   searchParams.append("name", "pierre");

  //   const url = `/recipes/search?${searchParams.toString()}`;
  //   navigation(url);
  // };

  const onSubmit = ({name, tags}) => {
    let tabTags = [];
    tags.forEach(tag => 
     ( tabTags.push(tag.value))
    );
    const nameParams = generateSearchParams('name', name)
    const tagsParams = generateSearchParams('tags', tabTags)
    console.log(tagsParams);
    const url = `/recipes/search?${nameParams || ""}&${tagsParams || ""}`;
    navigation(`/recipes/search?${nameParams || ""}&${tagsParams || ""}`);
  };

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <Controller
            name="name"
            control={methods.control}
            rules={{
              required: { value: true, message: "ENFIN BORDELLLLLLLL" },
            }}
            render={({ field }) => {
              return (
                <input
                  {...field}
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search a recipe..."
                />
              );
            }}
          />

          <FormInput />
        </div>
        <Button type={"submit"} text={"Search"} />
      </form>
     
    </FormProvider>
  );
}
