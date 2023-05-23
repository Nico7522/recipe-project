import { useForm } from "react-hook-form"
import { updateStatus } from "../../../API/connexion";
import Button from "../button";

export default function DuvUser({id}) {
    const { register, handleSubmit } = useForm();
    const { mutate } = updateStatus(id) 
    const handleStatus = ({status}) => {
        const statusChange = status
      console.log(status);
        mutate({id, statusChange})
    }
    return (
        <div className="flex flex-row">
            <form onSubmit={handleSubmit(handleStatus)}>
                <select {...register('status')} >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Certified user">Certified user</option>
                </select>
                <Button type={'submit'} text={"SET"} />
            </form>
            <Button type={'submit'} text={"BAN"}/>
        </div>
    )
}