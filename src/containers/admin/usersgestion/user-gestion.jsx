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

      <div className="sm:grid sm:grid-cols-4 sm:gap-4 m-auto bg-white w-3/4 max-w-7xl flex flex-col">
        {data.map((user) => {
          return <User {...user} />;
        })}
      </div>
    </>
  );
}
