export default function Title({text, style}){

    return(
        <h1 className={style ? style : 'text-center font text-xl mt-24'}>{text}</h1>
    )
}