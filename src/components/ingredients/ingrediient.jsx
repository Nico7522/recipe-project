import { useEffect } from "react";
import { useId, useState } from "react";

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
  const [macro, setMacro] = useState([]);
  let totalKcals = 0;
  tabMacro.forEach((i) => {
    if (i.units === "grammes" || i.units === "litres") {
      return (totalKcals += (i.calories / 100) * i.quantity);
    }
    if (i.units === "oz") {
      totalKcals += i.calories * i.quantity;
      return totalKcals
    }
    return totalKcals;
  });
  console.log("ingrédients =>", tabMacro);
  console.log("kcals =>", totalKcals);
  return (
    <div>
      <p>{name}</p>
      <p>
        {quantity} <span className="font">{units}</span>
      </p>
    </div>
  );
}
