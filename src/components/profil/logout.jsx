import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Logout() {
    const nav = useNavigate();
    const stateUser = useSelector((state) => state.user.userState)
    useEffect(() => {
        const disconnect = setTimeout(() => {
            nav("/");
          }, 2000);

          return () => clearTimeout(disconnect);
      });

    if (stateUser === "unauthorized" || stateUser === 'connected') {
      return <h2 className="font text-3xl text-red-700 text-center mt-36">Error</h2>;
  }
  return (
    <div>
      <h2 className="font text-3xl text-green-700 text-center">
        Succefully disconnected
      </h2>
    </div>
  );
}
