export default function Title({text, className}){

    return(
        <h1 className={'text-center font text-2xl mt-32 ' + className}>{text}</h1>
    )
}

Title.defaultProps = {
    className: ''
}