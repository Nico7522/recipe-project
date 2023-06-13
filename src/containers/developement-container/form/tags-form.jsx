import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { fetchTags } from "../../../../API/FETCH/fetch-tags";

export default function TagsForm(){
    const { data } = fetchTags()
    const { control } = useFormContext()
    return (
        <div>
            <Controller 
            name='tags'
            control={control}
            render={({ field }) => ( 
            <MultiSelect 
            
            />)}
            />
            {console.log(data)}
        </div>
    )
}