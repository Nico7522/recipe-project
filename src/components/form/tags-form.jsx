import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import { useEffect } from "react";
import { useFetchTags } from "../../../API/tags";


export default function TagsForm() {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const { data } = useFetchTags();
  useEffect(() => {
    let tab = [];
    if (data) {
      data.forEach((t) => tab.push({ label: t.name, value: t.name, id: t.id }));
      setTags(tab);
    }
  }, [data]);
  const { control } = useFormContext();
  return (
    <div>
      <label htmlFor="tags" className="text-white font text-2xl">
        TAGS :{" "}
      </label>

      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange } }) => (
          <MultiSelect
            options={tags}
            value={selectedTag}
            onChange={(select) => {
              onChange(select);
              setSelectedTag(select);
            }}
            labelledBy="tags"
            hasSelectAll={false}
            className="md:w-96 m-auto"
          />
        )}
      />
    </div>
  );
}
