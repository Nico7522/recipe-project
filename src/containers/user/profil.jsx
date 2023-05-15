import { useFetchUserById } from "../../../API/connexion";
import UserProfil from "../../components/profil/profil";
import { useQueryClient } from "react-query";

export default function Profil({userId}) {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useFetchUserById({userId})

    if (isLoading) {
        return <h2>WAIT</h2>
    }

    if (error) {
        return (
          <div>
            <p>Error</p>
          </div>
        );
      }
   
    return (
        <>
            <h2>PROFIL !</h2>
            
            <UserProfil {...data} />
        </>
    )
}