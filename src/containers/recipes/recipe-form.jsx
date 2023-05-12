// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { MultiSelect } from "react-multi-select-component";
// import { useFetchIngredient } from "../../../API/ingredient";
// import Button from "../../components/button";
// import Title from "../../components/title/title";
// import * as yup from "yup";

// export default function RecipeForm() {
//   const [options, setOptions] = useState([]);
//   const [showMultiSelect, setShowMultiSelect] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const [ingredients, setIngredients] = useState([]);
//   const recupEnfant = (ingredients) => {
//     setIngredients(ingredients);
//   };
//   const { isLoading, data } = useFetchIngredient();

//   useEffect(() => {
//     if (!isLoading) {
//       setOptions(data);
//       setShowMultiSelect(true);
//     }
//   }, [isLoading, data]);

//   let tab = [];
//   if (data) {
//     data.forEach((d) =>
//       tab.push({
//         label: d.name,
//         value: d.name,
//         id: d.id,
//         calories: d.calories,
//         proteins: d.proteins,
//         fats: d.fats,
//         carbohydrates: d.carbohydrates,
//       })
//     );
//   }

//   const {
//     handleSubmit,
//     control,
//     register,
//     reset,
//     formState: { errors },
//     getValues,
//   } = useForm({});

//   const submit = (data) => {
//     console.log(data);
//     const tabTemp = [];
//     tabTemp.push({
//       name: data.name,
//       description: data.description,
//       ingredients: ingredients,
//     });
//     console.log("tabTemp =>", tabTemp);
//   };
//   return (
//     <div className="w-96 m-auto">
//       <Title text={"CREATE A NEW RECIPE HERE !"} />
//       {showMultiSelect && (
//         <form
//           className="w-96 m-auto flex flex-col"
//           onSubmit={handleSubmit(submit)}
//         >
//           <div>
//             <label htmlFor="name">Name</label>
//             <input {...register("name")} type="text" />
//           </div>
//           <div className="flex flex-col text-center">
//             <label htmlFor="description">Description</label>
//             <input {...register("description")} id="desc" cols="50" rows="5" />
//           </div>
//           <h3 className="text-3xl text-center">Ingredients 👇👇👇</h3>
//           <Controller
//             control={control}
//             name="tab"
//             render={({ field: { onChange, value }, formState }) => (
//               <MultiSelect
//                 options={tab}
//                 value={selected}
//                 onChange={(select) => {
//                   onChange(select);
//                   setSelected(select);
//                 }}
//                 labelledBy="Select"
//                 disableSearch
//                 hasSelectAll={false}
//                 className="w-96 m-auto mt-5"
//               />
//             )}
//           />

//           <div className="text-center -ml-7">
//             <Button type={"submit"}>CREATE</Button>
//           </div>
//         </form>
//       )}
//       <FormIngredients selected={selected} func={recupEnfant} />
//     </div>
//   );
// }

// const FormIngredients = ({ selected, func }) => {
//   const { handleSubmit, register, reset } = useForm();
//   const handleIngredients = (data) => {
//     let tabId = [];
//     let tabFinalId = [];
//     const tabUnits = [];
//     let tabFinalUnits = [];
//     const tabQuantity = [];
//     let tabFinalQuantity = [];
//     let tabIngre = [];
//     for (let u in data) {
//       tabId.push({ id: isNaN(u) ? "" : u });
//       tabFinalId = tabId.filter((i) => {
//         return i.id !== "";
//       });
//       tabUnits.push({ unit: isNaN(data[u]) ? data[u] : "" });
//       tabFinalUnits = tabUnits.filter((u) => {
//         return u.unit !== "";
//       });
//       tabQuantity.push({ quantity: !isNaN(data[u]) ? data[u] : "" });
//       tabFinalQuantity = tabQuantity.filter((q) => {
//         return q.quantity !== "";
//       });
//     }

//     let i = 0;
//     while (i < tabFinalUnits.length) {
//       tabIngre.push({
//         id: tabFinalId[i].id,
//         quantity: tabFinalQuantity[i].quantity,
//         unit: tabFinalUnits[i].unit,
//       });
//       i++;
//     }
//     console.log(tabIngre);
//     func(tabIngre);

//     reset();
//   };
//   return (
//     <div className="w-96 m-auto">
//       <form
//         onSubmit={handleSubmit(handleIngredients)}
//         className=" w-96 flex flex-col justify-center items-center "
//       >
//         <h4>Quantity & unit : </h4>
//         {selected.map((i) => (
//           <div className="">
//             <p className="font">{i.value}</p>
//             <label htmlFor="quantity">Quantity :</label>
//             <input
//               {...register(`${i.id}`)}
//               className="w-12"
//               type="number"
//               id="quantity"
//             />

//             <select id="unit" {...register(`${i.value}`)}>
//               <option value="grammes">Grammes</option>
//               <option value="litres">Litres</option>
//               <option value="oz">OZ</option>
//               <option value="centilitres">Centilitres</option>
//             </select>
//           </div>
//         ))}
//         <Button type={"submit"}>CREATE</Button>
//       </form>
//     </div>
//   );
// };

// V2 TEST

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { useFetchIngredient } from "../../../API/ingredient";
import Button from "../../components/button";
import Title from "../../components/title/title";
import * as yup from "yup";
import axios from "axios";
import { PostRecipe } from "../../../API/recipe";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";

export default function RecipeForm() {
  const tags = [
    { label: "Vegan", value: "Vegan", id: "1" },
    { label: "Healthy", value: "Healty", id: "2" },
    { label: "Dessert", value: "Dessert", id: "3" },
  ];
  const idUser = useSelector((state) => state.user.user.user.id);

  const [isIngredientsValidate, setIngredientValidate] = useState(false);
  const disabledButton = `mt-5 bg-gray-300 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-gray-400 
  duration-500`;
  const [options, setOptions] = useState([]);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const [selected, setSelected] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [tag, setTag] = useState([]);
  const { mutate } = PostRecipe();

  const recupEnfant = (ingredients) => {
    setIngredients(ingredients);
    setIngredientValidate(true);
  };
  const { isLoading, data } = useFetchIngredient();

  useEffect(() => {
    if (!isLoading) {
      setOptions(data);
      setShowMultiSelect(true);
    }
  }, [isLoading, data]);

  let tab = [];
  if (data) {
    data.forEach((d) =>
      tab.push({
        label: d.name,
        value: d.name,
        id: d.id,
        calories: d.calories,
        proteins: d.proteins,
        fats: d.fats,
        carbohydrates: d.carbohydrates,
      })
    );
  }

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm({});

  const submit = (data) => {
    console.log(data);
    const tabTags = data.tags.map((t) => {
      return { id: t.id };
    });
    const tabTemp = [];
    tabTemp.push({
      name: data.name,
      description: data.description,
      ingredients: ingredients,
      tags: tabTags,
      UserId: idUser,
    });
    mutate(tabTemp[0]);
  };
  return (
    <div className="w-96 m-auto">
      <Title text={"CREATE A NEW RECIPE HERE !"} />
      {showMultiSelect && (
        <form
          className="w-96 m-auto flex flex-col"
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input {...register("name")} type="text" />
          </div>
          <div className="flex flex-col text-center">
            <label htmlFor="description">Description</label>
            <input {...register("description")} id="desc" cols="50" rows="5" />
          </div>

          <h3 className="text-3xl text-center">Tag👇👇👇</h3>
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value }, formState }) => (
              <MultiSelect
                options={tags}
                value={tag}
                onChange={(select) => {
                  onChange(select);
                  setTag(select);
                }}
                labelledBy="Select"
                disableSearch
                hasSelectAll={false}
                className="w-96 m-auto mt-5"
              />
            )}
          />

          <div className="text-center -ml-7">
            <Button
              styleDisable={disabledButton}
              disable={!isIngredientsValidate}
              type={"submit"}
            >
              CREATE
            </Button>
          </div>
        </form>
      )}

      {tab && (
        <FormIngredients
          isIngredientsValidate={isIngredientsValidate}
          tab={tab}
          func={recupEnfant}
        />
      )}
    </div>
  );
}

const FormIngredients = ({ func, tab, isIngredientsValidate }) => {
  const [selected, setSelected] = useState([]);
  const { handleSubmit, register, reset, control } = useForm();

  if (tab === undefined) {
    return <p>Wait...</p>;
  }
  const handleIngredients = (data) => {
    console.log("data", data);
    let tabId = [];
    let tabFinalId = [];
    const tabUnits = [];
    let tabFinalUnits = [];
    const tabQuantity = [];
    let tabFinalQuantity = [];
    let tabIngre = [];

    data.tab.map((p) => {
      tabId.push({ id: p.id });
    });
    console.log("tabid", tabId);

    for (let u in data) {
      tabUnits.push({
        unit: isNaN(data[u]) && !Array.isArray(data[u]) ? data[u] : "",
      });
      tabFinalUnits = tabUnits.filter((u) => {
        return u.unit !== "";
      });
    }

    for (let u in data) {
      tabQuantity.push({ quantity: !isNaN(data[u]) ? data[u] : "" });
      tabFinalQuantity = tabQuantity.filter((q) => {
        return q.quantity !== "";
      });
    }

    let i = 0;
    while (i < tabId.length) {
      console.log(tabId[i].id);
      console.log(tabFinalQuantity[i].quantity);
      console.log(tabFinalUnits[i].unit);
      tabIngre.push({
        id: tabId[i].id,
        quantity: tabFinalQuantity[i].quantity,
        unit: tabFinalUnits[i].unit,
      });
      i++;
    }
    func(tabIngre);
  };
  return (
    <div className="w-96 m-auto">
      <form
        onSubmit={handleSubmit(handleIngredients)}
        className=" w-96 flex flex-col justify-center items-center "
      >
        <h3 className="text-3xl text-center">Ingredients 👇👇👇</h3>
        <Controller
          control={control}
          name="tab"
          render={({ field: { onChange, value }, formState }) => (
            <MultiSelect
              options={tab}
              value={selected}
              onChange={(select) => {
                onChange(select);
                setSelected(select);
              }}
              labelledBy="Select"
              disableSearch
              hasSelectAll={false}
              className="w-96 m-auto mt-5"
            />
          )}
        />
        <h4>Quantity & unit : </h4>
        {selected.map((i) => (
          <div className="">
            <p className="font">{i.value}</p>
            <label htmlFor="quantity">Quantity :</label>
            <input
              {...register(`${i.id}`)}
              className="w-12"
              type="number"
              id="quantity"
            />

            <select id="unit" {...register(`${i.value}`)}>
              <option value="grammes">Grammes</option>
              <option value="litres">Litres</option>
              <option value="oz">OZ</option>
              <option value="centilitres">Centilitres</option>
            </select>
          </div>
        ))}

        <Button type={"submit"}>Validate your ingredients</Button>
      </form>
      <PictureForm />
    </div>
  );
};

// const schema = yup.object().shape({
//   name: yup.string().max(50).required(),
//   description: yup.string().required(),
//   ingredients: yup.array().of(yup.object().shape({
//     name: yup.string().required()
//   }))
// })

const PictureForm = () => {
  const { register, handleSubmit } = useForm();

  const handleSubmitImage = (data) => {
    const formData = new FormData();

    formData.append("picture", data.file[0]);
    console.log(data.file[0]);
    axios.post("url/api", formData);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitImage)}>
      <label htmlFor="file">Image</label>
      <input {...register("file")} type="file" id="picture" />
      <button type="submit">Upload your image</button>
    </form>
  );
};
