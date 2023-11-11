import React from 'react'
import userprofile from '../../img/more.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span>Dees Chat</span>
      <div className='user'>
        <img src='https://myfaithmedia.org/wp-content/uploads/2016/01/iStock_000067347115_Medium.jpg' alt='img-user' /> 
        <span>User</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar