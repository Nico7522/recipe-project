export const formArrayRecipe = (array) => {
  let tagsArray = [];
  let ingredientsArray = [];
  array.tags.forEach((t) => tagsArray.push({ id: t.id }));
  array.ingredients.forEach((i) =>
    ingredientsArray.push({
      id: i.id,
      quantity: array[`quantity${i.value}`],
      unit: array[`unit${i.value}`],
    })
  );

  return { tagsArray, ingredientsArray }
};
