import React from 'react'

// FIXME Rename style into classname
const Button = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.disable} type={props.type} className={!props.disable ? `bg-green-300 text-white font-[Poppins] py-2 px-6 rounded hover:bg-indigo-400 
    duration-500`+ " " + props.style : props.styleDisable}>
      {props.text}
    </button>
  )
}

export default Button