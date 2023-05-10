import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function AdminPanel(){

    return (
        <div className="flex flex-col m-auto mt-28 w-2/3 text-5xl  ">
            <Button style={"rounded-2xl"}>Recipes gestion</Button>
            <Button style={"rounded-2xl"}><Link to='comments'>Comments gestion</Link></Button>
            
        </div>
    )
}