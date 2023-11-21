import React from 'react'
import userprofile from '../../img/more.png'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span>Dees Chat</span>
      <div className='user'>
        {/* <img src='https://myfaithmedia.org/wp-content/uploads/2016/01/iStock_000067347115_Medium.jpg' alt='img-user' /> 
        <span>User</span> */}
        <img src={currentUser.photoURL} alt='img-user' /> 
        <span>{currentUser.displayName}</span>
        <button onClick={()=>(signOut(auth))}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar