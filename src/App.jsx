import { useEffect } from "react";
import { checkDark } from "../utils/darkmode";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disconnectedAction } from "./store/actions/user.action";

function App() {
  const dispatch = useDispatch();
  const isDisconnect = useSelector((state) => state.user.disconnect);

  
  useEffect(() => {
    checkDark();
  }, []);

  
  if (isDisconnect === "disconnected") {
    setTimeout(() => {
      dispatch(disconnectedAction())
    }, 2000)
    return (
      <div>
        <h2 className="text-green-300 font text-2xl text-center">
          Disconnected !{" "}
        </h2>
      </div>
    );
  }

  return (
    <div className="">
      <header className="z-50 top-0 start-0 end-0 fixed">
        <NavBar />
      </header>
      <main className="mt-[7.2rem]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
