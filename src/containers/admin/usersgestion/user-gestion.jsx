import { useFetchUser } from "../../../../API/connexion";
import UserProfil from "../../../components/profil/profil";
import User from "../../../components/profil/user";
import LastestRecipe from "../../recipes/lastest-recipes";

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

      <div className="sm:flex sm:flex-wrap sm:m-auto bg-white w-3/4 max-w-7xl m-auto xl:flex xl:flex-wrap xl:gap-2 ">
        {data.map((user) => {
          return <User {...user} />;
        })}

       
      </div>
    </>
  );
}
