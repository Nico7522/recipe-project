import { Outlet } from "react-router-dom";
import SearchBar from "../../components/searchbar/searchbar";
import FormSearch from "../../containers/formsearch/form-search";

export default function AllRecipesPage() {

    return (
        <div className="flex flex-row">
        <FormSearch />
        <Outlet />
        
        </div>
    )
}