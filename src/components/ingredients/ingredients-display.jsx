export default function IngredientDisplay({name,
  
    calories,
    carbohydrates,
    fats,
    proteins,
    tabMacro}){

    return (
        <div className="flex flex-col items-center justify-center gap-1 bg-green-700 border-green-950 border-4 w-1/4 m-auto text-center">
            <h3 className="font text-lg text-white">{name}</h3>
            <div className="flex flex-col text-white">
                <p>Calories : {calories} kcals</p>
                <p>Carbohydrates : {carbohydrates} g</p>
                <p>Proteins : {proteins} g</p>
                <p>Fats{fats} g</p>
            </div>
        </div>
    )
}