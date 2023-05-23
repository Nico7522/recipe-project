import { useFetchUserById } from "../../../API/connexion";
import UserProfil from "../../components/profil/profil";
import { useQueryClient } from "react-query";
import { useFetchUser } from "../../hooks/user-hooks";
import { Link } from "react-router-dom";
import Button from "../../components/button";

export default function Profil({ logedUserId }) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useFetchUserById({ logedUserId });
  const { userStatus, userId } = useFetchUser();

  if (isLoading) {
    return <h2>WAIT</h2>;
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
    

      <UserProfil {...data} />
      {(userStatus === "Admin" && logedUserId == userId) && (
        <div className="w-96 text-center mt-2 m-auto">
          <Link to="/admin">
            <Button text={"GESTION"} className={"bg-red-600"} ></Button>
          </Link>
        </div>
      )}
    </>
  );
}
