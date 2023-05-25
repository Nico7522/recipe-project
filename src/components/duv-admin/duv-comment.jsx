import Button from "../button";

export default function () {


    return (
        <div className="flex flex-row justify-center">
            <Button text={"Valid"}/>
            <Button text={"Unvalid"} className={"bg-red-300"}/>
            <Button text={"Delete"} className={"bg-red-300"}/>


        </div>
    )
}