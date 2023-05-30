import { useNavigate } from "react-router-dom"

export default function Comment({id, text, userName, createdAt}) {
    const navigation = useNavigate()
 const handleComment = (id) => {
    console.log(id);
    
    navigation('/comment/'+id)
 }
    return (
        <div onClick={() => handleComment(id)} className="border-b-2 border-green-700">
            <span className="font">{userName ? userName : 'Name not found'}</span>
            <span> [{createdAt}]</span>
            <p>{text}</p>
        </div>
    )
}