export default function Ingredient({name, quantity, units}){
  console.log(quantity);
    return (
           
        <div>
        <p >{name}</p>
        <p>{quantity} <span className="font">{units}</span></p>
        
      </div>
    )

}