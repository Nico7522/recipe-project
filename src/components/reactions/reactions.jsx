export default function Reaction({ reactions }) {
 

  let like = 0;
  let tasty = 0;
  let dislike = 0;
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
    <>
      <p>❤ : {like}</p>
      <p>🤤 : {tasty}</p>
      <p>👎 : {dislike}</p>
    </>
  );
}
