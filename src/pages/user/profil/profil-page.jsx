import { useParams } from "react-router-dom";
import Profil from "../../../containers/user/profil";

export default function ProfilPage(){
    const { userId } = useParams()
    return (
        <Profil userId={userId}/>
    )
}