import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick} className='bg-sky-600 w-[150px] h-10 text-white font-semibold rounded-md'>{props.children}</button>
  )
}

export default Button