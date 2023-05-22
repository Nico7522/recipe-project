import { useEffect } from "react";
import { useId, useState } from "react";
import { useCalcMacro } from "../../hooks/macro-hooks";

export default function Ingredient({
  name,
  quantity,
  units,
  calories,
  carbohydrates,
  fats,
  proteins,
  tabMacro,
}) {

  const idP = useId();
  const {macro} = useCalcMacro(tabMacro)


  return (
    <div>
      {console.log(macro)}
      <p>{name}</p>
      <p>
        {quantity} <span className="font">{units}</span>
      </p>
  
    </div>
  );
}
