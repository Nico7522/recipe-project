export default function ErrorDisplay({text, className}){

    return (
        <p className={"text-red-500 font text-3xl " + " " + className}>{text}</p>
    )
}