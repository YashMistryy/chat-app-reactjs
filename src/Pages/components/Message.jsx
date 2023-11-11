import React from 'react'

const Message = () => {
  return (
    <div className='message '>
      <div className="messageInfo">
        {/* it will contain an image (round) with the time of the message recieved */}
        <img src='https://myfaithmedia.org/wp-content/uploads/2016/01/iStock_000067347115_Medium.jpg'/>
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>Hello , Hi</p>
        <img src='https://myfaithmedia.org/wp-content/uploads/2016/01/iStock_000067347115_Medium.jpg'/>
      </div>
    </div>
  )
}

export default Message