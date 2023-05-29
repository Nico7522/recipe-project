import Title from "../../../components/title/title";
import CommentGestion from "../../../containers/admin/commentsgestion/comment-gestion";

export default function AdminCommentsPage(){
    return(
        <>
        <Title className={"mt-12"} text={"Comments gestion"} />
        <CommentGestion />
        </>
    )
}