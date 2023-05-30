import { useNavigate } from "react-router-dom"

export default function Comment({id, text, userName, createdAt, update, onUpdate, handleComment}) {
    const navigation = useNavigate()
 const handleComm = (text) => {
        onUpdate(false)
        handleComment(text)
    // navigation('/comment/'+id)
 }
    return (
        <div onClick={() => handleComm(text)} className="border-b-2 border-green-700">
            <span className="font">{userName ? userName : 'Name not found'}</span>
            <span> [{createdAt}]</span>
            <p>{text}</p>
        </div>
    )
}