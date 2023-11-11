import React from 'react'
import Img from '../../img/img.png'
import Attach from '../../img/attach.png'
const Inputbar = () => {
  return (
    <div className='inputbar'>
      <input type='text' placeholder='Enter some text.'/>
      <div className="send">
        {/* this div contains button to send alongside some imgbuttons like attach , images , etc */}
        <img src={Img} alt=''/>
        <input type='file' style={{display:'none'}} id='fileInput' />
        <label htmlFor="fileInput">
          <img src={Attach} alt=''/>
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Inputbar