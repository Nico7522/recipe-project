import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";

export default function FormInput() {
  const { register, control } = useFormContext();
  const [tag, setTag] = useState([]);

  const tags = [
    { label: "Vegan", value: "Vegan", id: "1" },
    { label: "Healthy", value: "Healthy", id: "2" },
    { label: "Dessert", value: "Dessert", id: "3" },
  ];
  return (
    <Controller
      control={control}
      name="tags"
      render={({
        field: { onChange, value },
        formState,
        fieldState: { errors },
      }) => (
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
          className="w-20 sm:w-28  z-20"
        />
      )}
    />
  );
}
