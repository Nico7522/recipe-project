export default function Comment({text, userName, createdAt}) {
    return (
        <div className="border-b-2 border-green-700">
            <span className="font">{userName ? userName : 'Name not found'}</span>
            <span> [{createdAt}]</span>
            <p>{text}</p>
        </div>
    )
}