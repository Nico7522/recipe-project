import Button from "../button";

export default function ConfirmModal({
  toogleModal,
  setToogleModal,
  sendRecipe,
}) {
  return (
    <div
      className={
        "absolute z-10 w-96 h-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-50 bg-green-200 border-4 border-green-800 transition-[margin-top] duration-1000" +
        " " +
        (toogleModal === false ? "opacity-0  modal-hidden  " : "down")
      }
    >
      <h3 className="text-center text-sky-50 text-5xl">Are you sure ?</h3>
      <div className="text-center -ml-8">
        <Button onClick={sendRecipe} text={"YES"} />
        <Button
          onClick={() => setToogleModal(false)}
          style={"bg-red-200"}
          text={"NO"}
        />
      </div>
    </div>
  );
}
