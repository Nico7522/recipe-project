import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";

export default function RecipeForm() {
  const [selected, setSelected] = useState([]);
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
    onChange,
  } = useForm({});
  const submit = ({ data }) => {
    console.log("data =>", data);
    const donnee = data?.options.map((element) => element.value);
    const body = JSON.stringify({ ...data, test: donnee });
    console.log("body =>", body);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="options"
        render={({ field: { onChange, value } }) => (
          <MultiSelect
            options={options}
            value={value ? value : []}
            onChange={onChange}
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
