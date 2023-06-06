import axios from "axios";
import qs from "qs";


export default function DevelopmentContainer(){
    
    axios.get('http://localhost:8080/api/search?', {params: {name: "qqq"}, paramsSerializer: param => { return qs.stringify(param)}}).then(r => console.log(r))
    console.log(data);
    return (
        <>
        <h1 className="text-white text-center text-2xl">TEST DEVELOPMENT</h1>
        </>
    )
}

