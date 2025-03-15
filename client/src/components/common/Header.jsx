import {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import { useClerk ,useUser} from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/userAuthorContext';
function Header() {
  const {signOut}=useClerk()
  const {isSignedIn,user,isLoaded}=useUser()
  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj);
  const navigate=useNavigate()


  //function to signout
 async function handleSignout(){
    await signOut();
    setCurrentUser(null);
    Navigate('/')
  }

  return (
    <div>
      <nav className='header d-flex justify-content-between'>
        <div className="d-flex justify-content-center">
          <Link to='/'>LOGO</Link>
        </div>
       <ul className='d-flex justify-content-around header-links list-unstyled'>
         
         {
          !isSignedIn?
          <>
          <li>
          <Link to='' className='link ms-4'>Home</Link>
          </li>
          <li>
          <Link to='signin' className='link ms-4'>Signin</Link>
          </li>
          <li>
          <Link to='signup' className='link ms-4'>Signup</Link>
          </li>
          </>:
          <div className='user-button' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{position:"relative" , textAlign: "center"}}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width='40px' className='rounded-circle' alt="" />            
               <p className="role" style={{position:'absolute',top:'0px',right:'-20px'}}>{currentUser.role}</p>
            </div>
            <p className='mb-1 user-name' style={{ marginBottom: '1px' }}>{user.firstName}</p>

            <button className="btn btn-danger signout-btn" onClick={handleSignout}>SignOut</button>
          </div>
         }
        
        
       </ul>
      </nav>
    </div>
  )
}

export default Header