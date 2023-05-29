import Button from "../Button";
import DuvRecipe from "../duv-admin/duv-recipe";

export default function RecipeAdmin({
  id,
  name,
  description,
  imgURL,
  ingredients,
  valid,
}) {
  return (
    <div className="w-72 h-96">
       
    <div className="w-72 h-80 overflow-scroll overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-rounded-md scrollbar-thumb-green-700 scrollbar-track-gray-100 scrollbar-w-2 border-red-400 border-2  bg-black break-words text-center">
        <h2 className="text-align text-white">Valid : {valid ? 'True' : "False"}</h2>
      <img
        src={"http://localhost:8080" + imgURL}
        className="rounded-2xl block m-auto shadow-md "
        alt="image recipe"
      />
      <div className="break-words">
      <h3 className="font bg-red-300 mb-1 mt-1">Recipe name</h3>

        <h3 className="break-words bg-green-900 text-white rounded-2xl font ">{name}</h3>
        <h3 className="font bg-red-300 mt-1">Description</h3>

        <p className="break-words mt-2 bg-green-900 text-white rounded-2xl">
          {description}
        </p>
      </div>
      <div >
            <h3 className="font bg-red-300 mt-1">Ingredients</h3>
          <section className=" bg-green-900 rounded-2xl text-white mt-2">
        {ingredients.map((i) => (
            <div className="flex flex-row">
              <p className="text-center m-auto">
                {i.name} {i.quantity} {i.units}{" "}
              </p>
            </div>
        ))}
        </section>
      </div>
    </div>
    <DuvRecipe valid={valid} id={id} />
    </div>
  );
}
