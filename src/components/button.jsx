import React from 'react'

const Button = (props) => {
  return (
    <button disabled={props.disable} type={props.type} className={!props.disable ? `mt-5 bg-green-300 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
    duration-500`+ " " + props.style : props.styleDisable}>
      {props.children}
    </button>
  )
}

export default Button