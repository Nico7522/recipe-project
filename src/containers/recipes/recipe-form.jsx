// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { MultiSelect } from "react-multi-select-component";
// import { useFetchIngredient } from "../../../API/ingredient";

// export default function RecipeForm() {
//   const [options, setOptions] = useState([]);
//   const { isLoading, data } = useFetchIngredient();

//   useEffect(() => {
//     if (!isLoading) {
//       setOptions(data);
//     }
//   }, [isLoading, data]);

//   const {
//     handleSubmit,
//     control,
//     register,
//     reset,
//     formState: { errors },
//     getValues,
//   } = useForm({});
  
//   const submit = () => {
//     const values = getValues();
//     const data = values.data.name.map((element) => element.name);
//     console.log("body =>", data);
//   };
  
//   return (
//     <form onSubmit={handleSubmit(submit)}>
//       <Controller
//         control={control}
//         name="data.name"
//         render={({ field: { onChange, value } }) => (
//           <MultiSelect
//           options={data.map(({ name, _id }) => ({ label: name, value: _id, name: name }))}
//           value={value ? value : []}
//           onChange={(selected) => {
//             const selectedNames = selected.map((option) => option.name);
//             const previousNames = value ? value.map((option) => option.name) : [];
//             const newValue = data.filter((option) => {
//               if (selectedNames.includes(option.name)) {
//                 return true;
//               }
//               if (previousNames.includes(option.name)) {
//                 return false;
//               }
//               return option.is_default;
//             });
//             onChange(newValue);
//           }}
//             labelledBy="Select"
//             disableSearch
//             hasSelectAll={false}
//           />
//         )}
//       />
//       <button type="submit">TEST</button>
//     </form>
//   );
// }


import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { useFetchIngredient } from "../../../API/ingredient";

export default function RecipeForm() {
  const [options, setOptions] = useState([]);
  const { isLoading, data } = useFetchIngredient();

  useEffect(() => {
    if (!isLoading) {
      setOptions(data);
    }
  }, [isLoading, data]);

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm({});
  
  const submit = () => {
    const values = getValues();
    const data = values.data.name.map((element) => element.name);
    console.log("body =>", data);
  };
  
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="data.name"
        render={({ field: { onChange, value } }) => (
          <MultiSelect
            options={options.map(({ name, _id }) => ({ label: name, value: _id, name: name }))}
            value={value ? value : []}
            onChange={(selected) => {
              const selectedValues = selected.map((option) => option.id);
              const newValue = data.filter((option) => {
                return selectedValues.includes(option.id);
              });
       
              
              onChange(newValue);
            }}
            labelledBy="Select"
            disableSearch
            hasSelectAll={false}
          />
        )}
      />
      <button type="submit">TEST</button>
    </form>
  );
}