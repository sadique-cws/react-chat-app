import React from 'react'

const OnlineUsers = ({selectUser,data,username}) => {
  return (
    <div className='p-2'>
        <h4> Online Users </h4>
        <ul className='list-group'>
          {
            data && Object.keys(data).map((user,index) => username !== user && (
              <li style={{cursor:"pointer"}} className='list-group-item list-group-item-action' 
              key={index} 
              onClick={() => selectUser("srk")}>
                <span className='me-2'>
                  <img alt='demo' src={`https://picsum.photos/30/30?random=${index}`} className='rounded-circle'/></span>
                  <span>{user}</span>
                  <span className='float-end text-success small mt-1 fw-bold'>online</span>
              </li>
            ))
          }
         
         
        </ul>
      
  </div>
  )
}

export default OnlineUsers