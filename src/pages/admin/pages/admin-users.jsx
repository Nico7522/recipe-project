import Title from "../../../components/title/title";
import UserGestion from "../../../containers/admin/usersgestion/user-gestion";

export default function AdminUserPage(){

    return (
        <>
        <Title className={"mt-12"} text={"Users gestion"} />
        <UserGestion />
        </>
    )
}