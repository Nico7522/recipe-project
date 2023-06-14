import { useFormContext } from "react-hook-form";

export default function QuantityUnitForm({ i }) {
    const { register } = useFormContext();

  return (
    <div
      className="w-52 border-2 border-green-200 rounded-md bg-green-800"
      key={i.value}
    >
      <p className="font text-2xl">{i.value}</p>
      <div className="flex flex-row items-center flex-wrap justify-center ">
        <label className="mr-1">Quantity</label>
        <br />
        <input
          type="number"
          className="text-black text-center w-12 h-5 rounded-2xl"
          {...register(`quantity${i.value}`)}
        />
      </div>
      <p>Unit : </p>
      <div className="flex flex-row items-center justify-center">
        <br />
        <select
          className="text-black text-center w-18"
          {...register(`unit${i.value}`)}
          id=""
        >
          <option value="litres">Litres</option>
          <option value="grammes">Grammes</option>
          <option value="oz">Oz</option>
        </select>
      </div>
    </div>
  );
}
