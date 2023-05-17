export default function Title({text, className}){

    return(
        <h1 className={'text-center font text-xl mt-5 ' + className}>{text}</h1>
    )
}

Title.defaultProps = {
    className: ''
}