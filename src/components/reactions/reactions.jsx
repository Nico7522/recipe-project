import { postReaction, useFetchReactions } from "../../../API/reaction";

export default function Reaction({ reactions, id }) {
 
  // const {data, error, isLoading} = useFetchReactions()
  const {mutate} = postReaction()
  let like = 0;
  let tasty = 0;
  let dislike = 0;

  // if (isLoading) {
  //   return <p>Wait...</p>
  // }
  reactions.forEach((r) => {
    if (r.reaction === "like") {
      like += 1;
    }
    if (r.reaction === "tasty") {
      tasty += 1;
    }
    if (r.reaction === "dislike") {
      dislike += 1;
    }
  });
  return (
    <div className=" flex flex-row cursor-pointer">
      <p onClick={() => mutate({reaction: "like",
    userId: 1,
    recipeId: id})}>❤ : {like}</p>
      <p onClick={() => mutate({reaction: "tasty",
    userId: 1,
    recipeId: id})}>🤤 : {tasty}</p>
      <p onClick={() => mutate({reaction: "dislike",
    userId: 1,
    recipeId: id})}>👎 : {dislike}</p>
    </div>
  );
}
