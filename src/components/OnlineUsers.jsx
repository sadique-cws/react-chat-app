import React from 'react'

const OnlineUsers = ({selectUser,data,username,checkUnseenMessages}) => {
  return (
    <div className='p-2'>
        <h4> Online Users </h4>
        <ul className='list-group'>
          {
            data && Object.keys(data).map((user,index) => username !== user && (
              <li style={{cursor:"pointer"}} className='list-group-item list-group-item-action' 
              key={index} 
              onClick={() => selectUser(user)}>
                <span className='me-2'>
                  <img alt='demo' src={`https://picsum.photos/30/30?random=${index}`} className='rounded-circle'/></span>
                  <span>{user}</span>
                  <span className='float-end text-success small mt-1 fw-bold'>online 
                   { checkUnseenMessages(user) != 0 &&
                     <span className='badge rounded-pill bg-success mx-2'>
                     {checkUnseenMessages(user)}
                   </span>
                   }
                  </span>
              </li>
            ))
          }
         
         
        </ul>
      
  </div>
  )
}

export default OnlineUsers