import { useNavigate } from "react-router-dom";
import DuvUser from "../duv-admin/duv-user";

export default function User({
    id,
    name,
    surname,
    email,
    birthdate,
    status,
    createdAt,
    avatar,
    recipes,
  }) {
    const navigation = useNavigate()
    const birthdateFormated = new Date(birthdate).toLocaleDateString("fr", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    
      const creationDate = new Date(createdAt).toLocaleDateString("fr", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const creationDateTime = new Date(createdAt).toLocaleTimeString();

    return (
        <>
    
            <div className="w-72 h-auto border-2 border-green-400 m-auto ">
              <h2 onClick={() => navigation("/user/profil/" + id)} className="font text-center text-3xl ">Details</h2>
              <img
                src={"http://localhost:8080" + avatar}
                alt="avatar"
                width={100}
                height={100}
                className="block m-auto"
              />
              <h3 className="text-center text-2xl">Full name : </h3>{" "}
              <p className="text-center text-1xl border-2 border-green-200  bg-green-100 m-auto">
                {name} {surname}
              </p>
              <h3 className="text-center text-2xl">Mail : </h3>{" "}
              <p className="text-center text-1xl border-2 border-green-200 bg-green-100 m-auto">
                {email}
              </p>
              <h3 className="text-center text-2xl">Birthdate : </h3>{" "}
              <p className="text-center text-1xl border-2 border-green-200 bg-green-100 m-auto">
                {birthdateFormated}
              </p>
              <h3 className="text-center text-2xl">Status : </h3>{" "}
              <p className="text-center text-1xl border-2 border-green-200 bg-green-100 m-auto">
                {status}
              </p>
              <h3 className="text-center text-2xl">Creation date : </h3>{" "}
              <p className="text-center text-1xl border-2 border-green-200 bg-green-100 m-auto">
                 {createdAt}
              </p>
            
            <DuvUser id={id} />
            </div>
          

        </>
      );
    
}