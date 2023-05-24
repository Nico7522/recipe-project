export default function ShowTags( t ) {
  switch (t) {
    case "Vegan":
      return "Vegan ☘";

    case "Healthy":
      return "Healthy 🥗";

    case "Dessert":
      return "Dessert 🧁";

    default:
      return t;
  }
 
}
