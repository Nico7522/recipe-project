import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";

import { useEffect } from "react";
import { useState } from "react";
import { useFetchIngredient, useFetchIngredientForm } from "../../../API/ingredient";
import QuantityUnitForm from "./quantity-unit-form";

export default function IngredientsForm() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { data } = useFetchIngredientForm();

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
      {selectedIngredients.map((i) => (
        <QuantityUnitForm i={i} key={i.id} selectedIngredients={selectedIngredients} />
        ))}
        </div>
    </div>
  );
}
