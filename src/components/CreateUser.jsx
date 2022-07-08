import React from 'react'

const CreateUser = ({handleSetUsername,value,onChange}) => {
  return (
    <form onSubmit={() => handleSetUsername()} className="p-2">
      <label>Enter your name</label>
      <input className='form-control' value={value} onChange={(e) => onChange(e.target.value)}/>
    </form>
  )
}

export default CreateUser