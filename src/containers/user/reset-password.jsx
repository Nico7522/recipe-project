import FormResetPassword from "../../components/formresetpassword/form-reset-password";
import Title from "../../components/title/title";

export default function ResetPassword(){
    return (
        <div>
            <Title text={"Reset password"} />
            <FormResetPassword />
        </div>
    )
}