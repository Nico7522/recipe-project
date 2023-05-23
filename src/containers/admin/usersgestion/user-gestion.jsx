import { useFetchUser } from "../../../../API/connexion";
import UserProfil from "../../../components/profil/profil";
import User from "../../../components/profil/user";

export default function UserGestion() {
  const { data, isLoading, isError } = useFetchUser();

  if (isLoading) {
    return <p>Wait...</p>;
  }

  if (isError) {
    return <p>Error !</p>;
  }
  return (
    <>
      <h2>TO DO ! </h2>

      <div className="grid grid-cols-4 gap-4 m-auto bg-white w-3/4">
        {data.map((user) => {
          return <User {...user} />;
        })}
      </div>
    </>
  );
}
