// import axios from "axios";
// import qs from "qs";
// import Button from "../../../components/button";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";
import IngredientsForm from "./form/ingredients-form";
import TagsForm from "./form/tags-form";
import Button from "../../components/button";

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
  const methods = useForm()
  const handleRecipe = (data) => {
    console.log(data);
  }
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleRecipe)}>
            <label htmlFor="name">Recipe name : </label>
            <input type="text" {...methods.register('name')} />
            <label htmlFor="description">Description : </label>
            <input type="text" {...methods.register('description')} />
          <TagsForm />
          <IngredientsForm />
          <Button className={"z-10"} type={"submit"} text={"Search"} />

        </form>
      </FormProvider>
    </div>
  );
}
