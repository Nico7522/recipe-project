import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { useFetchIngredient } from "../../../API/ingredient";

export default function RecipeForm() {
  const [options, setOptions] = useState([]);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const [selected, setSelected] = useState([]);
  const { isLoading, data } = useFetchIngredient();

  useEffect(() => {
    if (!isLoading) {
      setOptions(data);
      setShowMultiSelect(true);
    }
  }, [isLoading, data]);

  let tab = [];
  if (data) {
    data.forEach((d) => tab.push({ label: d.name, value: d.name, calories: d.calories }));
  }

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm({});

  const submit = ({ data }) => {
    // data.map((r) => console.log(r))
    console.log(data);
    let values = getValues();
    console.log(values);
  };
  return (
    <div>
      {showMultiSelect && (
        <form onSubmit={handleSubmit(submit)}>
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
              />
            )}
          />
          <button type="submit">TEST</button>
        </form>
      )}
    </div>
  );
}
