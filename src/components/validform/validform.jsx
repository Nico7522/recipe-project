import { Checkbox } from "@material-ui/core";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function ValidForm({ handleValid, valid, text }) {
  const { handleSubmit, control } = useForm();

  return (
    <form className="flex flex-col">
      <h2 className="text-white text-center">{text}</h2>

      <Controller
        name="unvalid"
        control={control}
        render={({ field }) => (
          <Checkbox
            onChange={() => handleValid(!valid)}
            checked={valid === true && !undefined}
          />
        )}
      />
    </form>
  );
}
