import React from 'react'

const OnlineUsers = ({selectUser,data}) => {
  return (
    <div className='online-container'>
      <div className='onlineCard'>
        <h4> Online Users </h4>
      </div>
        <ul className='online-list'>
          {
            data && Object.keys(data).map((user,index) => (
              <li key={index} onClick={() => selectUser("srk")}><span>{user} </span></li>
            ))
          }
         
         
        </ul>
      
  </div>
  )
}

export default OnlineUsers