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
      data.forEach((i) => tab.push({ label: i.name, value: i.name }));
      setIngredients(tab);
    }
  }, [data]);
  const { control, register } = useFormContext();
  return (
    <div>
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
          />
        )}
      />{" "}
      <div className="flex flex-row text-white">
        {selectedIngredients.map((t) => (
          <div key={t.value}>
            <label htmlFor="">{t.value}</label>
            <p>Quantity : </p>
            <br />
            <input
              type="number"
              className="text-black"
              {...register(`quantity${t.value}`)}
            />
            <p>Unit : </p>
            <br />
            <input
              type="text"
              className="text-black"
              {...register(`unit${t.value}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
