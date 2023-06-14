import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { useFetchIngredient } from "../../../../API/ingredient";
import { useEffect } from "react";
import { useState } from "react";

export default function IngredientsForm() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const { data } = useFetchIngredient();
 
  useEffect(() => {
    console.log(data);
    let tab = [];
    if (data) {
      data.forEach((i) => tab.push({ label: i.name, value: i.name, id: i.id }));
      setIngredients(tab);
    }
  }, [data]);
  const { control, register } = useFormContext();
  return (
    <div>
        <label htmlFor="tags" className="text-white font text-2xl">
        INGREDIENTS :{" "}
      </label>
      <Controller
        control={control}
        name="ingredients"
        render={({ field: { onChange } }) => (
          <MultiSelect
            options={ingredients}
            value={selectedIngredients}
            onChange={(select) => {
              onChange(select);
              setSelectedIngredients(select);
            }}
            labelledBy="ingredients"
            hasSelectAll={false}
            className="w-96 m-auto"
          />
        )}
      />{" "}
      <div className="flex flex-row items-center flex-wrap justify-center mt-2 mb-2 text-white">
        {selectedIngredients.map((t) => (
          <div className="w-52 border-2 border-green-200 rounded-md bg-green-800" key={t.value}>
            <p className='font text-2xl'>{t.value}</p>
            <div className="flex flex-row items-center flex-wrap justify-center ">
            <label className="mr-1">Quantity</label>
            <br />
            <input
              type="number"
              className="text-black text-center w-12 h-5 rounded-2xl"
              {...register(`quantity${t.value}`)}
            />
            </div>
            <p>Unit : </p>
            <div className="flex flex-row items-center justify-center">
            <br />
            <select  className="text-black text-center w-18" {...register(`unit${t.value}`)} id="">
              <option value="litres">Litres</option>
              <option value="grammes">Grammes</option>
              <option value="OZ">Oz</option>
            </select>

            </div>
       
          </div>
        ))}
      </div>
    </div>
  );
}
