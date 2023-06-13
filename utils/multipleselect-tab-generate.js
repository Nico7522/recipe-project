import { fetchTags } from "../API/FETCH/fetch-tags";

export const getTags = async (setState) => {
  try {
    const data = await fetchTags();
    let tab = [];
    data.forEach((t) => tab.push({ label: t.name, value: t.name }));
    setState(tab);

   
  } catch (error) {
    console.error(error);
  }
};
