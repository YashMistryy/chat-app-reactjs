import React from 'react'
import Cam from '../../img/cam.png'
import Add from '../../img/add.png'
import More from '../../img/more.png'
import Messages from './Messages'
import Inputbar from './Inputbar'

const chat = () => {
  return (
    <div className='chat'>
        <div className="chatInfo">
          <span>User</span>
          <div className="chatIcons">
            <img src={Cam} alt=''/>
            <img src={Add} alt=''/>
            <img src={More} alt=''/>
          </div>
        </div>

        {/* here will lie all the messages hence a messages component */}
        <Messages/>
        {/* below lies the input for writing chats */}
        <Inputbar/>
        </div>
  )
}

export default chat