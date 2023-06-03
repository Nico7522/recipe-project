
import "./App.css";
import NavBar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";


function App() {


  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    console.log(('true'));
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  const darkMode = () => {
    localStorage.theme === 'dark' ?  localStorage.removeItem('theme') :localStorage.setItem('theme', 'dark') 
    
    location.reload()
  }

  return (
    <div className="">
      <header className="z-50 top-0 start-0 end-0 fixed">
        <NavBar />
      </header>
      <main className="mt-[7.2rem]">
        <button onClick={() => darkMode()} className="bg-black text-white w-28 rounded-2xl absolute right-0">Dark Mode</button>
        <Outlet />
      </main>
  
    </div>
  );
}

export default App;
