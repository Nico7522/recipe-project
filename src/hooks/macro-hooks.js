import { useEffect, useState } from "react";

export const useCalcMacro = (tabMacro) => {
  const [macro, setMacro] = useState("");
  let totalKcals = 0;
  let totalProt = 0;
  let totalFat = 0;
  let totalCarb = 0;
  let totalMacro = { kcals: "", proteins: "", fats: "", carbohydrates: "" };
  tabMacro.forEach((i) => {
    if (i.units === "grammes" || i.units === "litres") {
      totalProt += (i.proteins / 100) * i.quantity;
      totalFat += (i.fats / 100) * i.quantity;
      totalCarb += (i.carbohydrates / 100) * i.quantity;
      totalKcals += (i.calories / 100) * i.quantity;
    }
    if (i.units === "oz") {
      totalProt += i.proteins * i.quantity;
      totalFat += i.fats * i.quantity;
      totalCarb += i.carbohydrates * i.quantity;
      totalKcals += i.calories * i.quantity;
      totalKcals, totalProt, totalFat, totalCarb;
    }

    return (
      (totalMacro.kcals = totalKcals),
      (totalMacro.carbohydrates = totalCarb),
      (totalMacro.fats = totalFat),
      (totalMacro.proteins = totalProt)
    );
  });

  useEffect(() => {
    setMacro(totalMacro);
  }, []);

  return { macro };
};
