import React from 'react'

const MessageContainer = () => {
  return (
    <div className='chating-container'>
    <div className='chating-header'>Sadique</div>
    <div className='chating-body'>

    </div>
    <div className='chating-footer'>
    <form>
        <textarea placeholder='Type something...'></textarea>
        <input type="submit" value="send"/>
    </form>
    </div>
</div> 
  )
}

export default MessageContainer