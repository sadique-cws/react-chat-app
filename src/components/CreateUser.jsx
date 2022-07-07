import React from 'react'

const CreateUser = ({handleSetUsername,value,onChange}) => {
  return (
    <div className='user-details'>
    <form onSubmit={() => handleSetUsername()} style={{display:"inline-block"}}>
      <h4 className='username-label'>Enter your name</h4>
        <input className='input' value={value} onChange={(e) => onChange(e.target.value)}/>
    </form>
</div>
  )
}

export default CreateUser