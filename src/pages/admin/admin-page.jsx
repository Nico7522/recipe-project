import { Outlet } from "react-router-dom";
import AdminPanel from "../../containers/admin/admin-panel";

export default function AdminPage(){

    return (
        <>
        <AdminPanel />
        <Outlet/>
        </>
    )
}