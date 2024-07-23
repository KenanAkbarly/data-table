import React from 'react'

const Checkbox = ({isChecked,onChange}) => {
    // console.log(isChecked)
  return (
    <div>
        <input isChecked={isChecked} onChange={onChange} type="checkbox" name="" id="" />
    </div>
  )
}

export default Checkbox