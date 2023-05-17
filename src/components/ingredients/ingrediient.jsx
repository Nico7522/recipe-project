import { useId } from "react"

export default function Ingredient({name, quantity, units}){
  const idP = useId()
    return (
           
        <div>
        <p >{name}</p>
        <p>{quantity} <span className="font">{units}</span></p>
        
      </div>
    )

}