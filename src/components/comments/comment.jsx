export default function Comment({text, userName, createdAt}) {
    return (
        <div className="ml-5 border-b-2 w-96">
            <span className="font">{userName ? userName : 'Name not found'}</span>
            <span> [{createdAt}]</span>
            <p>{text}</p>
        </div>
    )
}