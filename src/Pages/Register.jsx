import React from 'react'
import AddAvatatar from '../img/addAvatar.png'
const Register = () => {
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Dees Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{display:'none'}}  id='file-input' type="file" className="email" placeholder='your avatar!' />
          <label htmlFor='file-input'>
            <img src={AddAvatatar} alt='img-not-loaded'/>
            <span>Add An Avatar!</span>
            </label>
          <button className='btn-sign-up'>Sign up</button>
          </form>     

          <p>Already have an account? Login</p>

      </div>
    </div>
  )
}

export default Register