import { useState } from "react";
import Button from "../button";

export default function ConfirmModal({modal, toogleModal, sendData, error}) {

    return (
        <div className={"absolute z-10 w-96 h-96 border-2  bg-slate-400 border-gray-500 transition-[margin-top] duration-1000" + " " + ( modal === false ? "opacity-0  modal-hidden  " : "down")}> 

            <h3 className="text-center text-sky-50 text-5xl">Are you sure ?</h3>
            <div className="text-center -ml-8" >
            <Button onClick={sendData} text={'YES'}/>
            <Button onClick={() => toogleModal(false)} style={"bg-red-200"} text={'NO'}/>
            </div>
           
        </div>
    )
}