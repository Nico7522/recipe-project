export default function Ingredient({name, quantity, units}){

    return (
           
        <div>
        <p>{name}</p>
        <p>{quantity} <span className="font">{units}</span></p>
        
      </div>
    )

}