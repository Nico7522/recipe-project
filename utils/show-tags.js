export default function ShowTags( t ) {
  switch (t) {
    case "Vegan":
      return "Vegan ☘";

    case "Healthy":
      return "Healthy 🥗";

    case "Dessert":
      return "Dessert 🧁";
    case "Main course":
      return "Main course 🍜"

    default:
      return t;
  }
 
}
