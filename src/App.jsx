import { useEffect } from "react";
import { checkDark } from "../utils/darkmode";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";


function App() {
  useEffect(() => {
    checkDark();
  }, []);


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
