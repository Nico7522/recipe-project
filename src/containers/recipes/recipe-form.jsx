import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { useFetchIngredient } from "../../../API/ingredient";
import Button from "../../components/button";
import Title from "../../components/title/title";
import * as yup from "yup";

export default function RecipeForm() {
  const [options, setOptions] = useState([]);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const [selected, setSelected] = useState([]);
  const [quantity, setQauntity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [ingredients, setIngredients] = useState([])
  const { isLoading, data } = useFetchIngredient();

  // const schema = yup.object().shape({
  //   name: yup.string().max(50).required(),
  //   description: yup.string().required(),
  //   ingredients: yup.array().of(yup.object().shape({
  //     name: yup.string().required()
  //   }))
  // })

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
    const tabTemp = [];

  };
  return (
    <div className="w-96 m-auto">
      <Title text={"CREATE A NEW RECIPE HERE !"} />
      {showMultiSelect && (
        <form
          className="w-96 m-auto flex flex-col"
          onSubmit={handleSubmit(submit)}
        >
          <div className="flex flex-col text-center">
            <label htmlFor="desc">Description</label>
            <textarea name="desc" id="desc" cols="50" rows="5"></textarea>
          </div>
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

          <div className="text-center -ml-7">
            <Button type={"submit"}>CREATE</Button>
          </div>
          {/* <button type="submit">CREATE</button>  */}
        </form>
      )}
    <FormIngredients selected={selected}/>
    </div>
  );
}

const FormIngredients = ({selected}) => {
  const {handleSubmit, register, reset} = useForm()
  const handleIngredients = (data) => {
    let tabId = [];
    let tabFinalId = [];
    const tabUnits = [];
    let tabFinalUnits = [];
    const tabQuantity = [];
    let tabFinalQuantity = [];
    let tabIngre = [];
    for(let u in data){
      tabId.push({id: isNaN(u) ? '' : u});
      tabFinalId = tabId.filter((i)=> {return i.id !== ''})
      tabUnits.push({unit : isNaN(data[u])  ? data[u]: ''})
      tabFinalUnits = tabUnits.filter((u )=> {return u.unit !== ''})
      tabQuantity.push({quantity: !isNaN(data[u]) ? data[u] : ''})
      tabFinalQuantity = tabQuantity.filter((q)=> {return q.quantity !== ''})
    }
  
    let i = 0
    while (i < tabFinalUnits.length) {
      tabIngre.push({
        id: tabFinalId[i].id,
        quantity: tabFinalQuantity[i].quantity,
        unit: tabFinalUnits[i].unit
      })
      i++
    }
    console.log(tabIngre);
    reset()
   
  }
return (
  <div className="w-96 m-auto">
  <form onSubmit={handleSubmit(handleIngredients)} className=" w-96 flex flex-col justify-center items-center " >
    <h4>Quantity & unit : </h4>
    {selected.map((i) => (
      <div className="">
        <p className="font">{i.value}</p>
      <label htmlFor="quantity">Quantity :</label> 
      <input {...register(`${i.id}`)}   className="w-12" type="number" id="quantity" />

      <select id="unit" {...register(`${i.value}`)} >
      <option value="grammes">Grammes</option>
      <option value="litres">Litres</option>
      <option value="oz">OZ</option>
      <option value="centilitres">Centilitres</option>
      </select>
      </div>
    ))}
     <Button type={"submit"}>CREATE</Button>
  </form>
  {/* {console.log(quantity)}
  {console.log(unit)} */}
  </div>
)

}
