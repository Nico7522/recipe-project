import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCalcMacro } from "../../hooks/macro-hooks";

export default function CalculByPart({ macro }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [numberOfParts, setNumberOfParts] = useState(1);
  const handleNumber = (data) => {
    console.log(data);
  };
  return (
    <div onSubmit={handleSubmit(handleNumber)}>
      <form>
        <label htmlFor="calcul"></label>
        <Controller
          control={control}
          name="calcul"
          defaultValue={numberOfParts}
          render={({ field, fieldState: { invalid, error } }) => (
            <input
              min={"1"}
              className="text-black"
              {...field}
              onChange={(e) => {
                setNumberOfParts(e.target.value);
                field.onChange(e);
                field.value = { e };
              }}
              type="number"
              error={errors.calcul}
            />
          )}
          rules={{
            pattern: {
              value: /^[-+]?[1-9]\d*\.?[0]*$/,
              message: "Negative number not allowed",
            },
          }}
        />
      </form>
      {numberOfParts > 1 && (
        <p>
          {(macro.kcals / numberOfParts).toFixed(2)} Kcals :{" "}
          {(macro.carbohydrates / numberOfParts).toFixed(2)}g Carbs,{" "}
          {(macro.fats / numberOfParts).toFixed(2)}g Fats,{" "}
          {(macro.proteins / numberOfParts).toFixed(2)}g Prots
        </p>
      )}
    </div>
  );
}
