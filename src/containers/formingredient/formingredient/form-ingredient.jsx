import axios from "axios";
import qs from "qs";
import Button from "../../../components/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function DevelopmentContainer(){
    const [value, setValue] = useState('')
    const navigation = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(value);
        axios.get('http://localhost:8080/api/search', {
            params: {
                name: value
            },
             paramsSerializer: param => { return qs.stringify(param)}}).then(r => console.log(r))
        
             navigation("/admin/development", { state: value });
    }
    return (
        <>
        <h1 className="text-white text-center text-2xl">TEST DEVELOPMENT</h1>

        <form onSubmit={handleSearch}>
            <label htmlFor="search">search</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <Button text={"SEARCH"}/>
        </form>
        </>
    )
}

