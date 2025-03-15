import React, {useContext} from 'react'
import { Link, Outlet } from 'react-router-dom'
import { userAuthorContextObj } from "../../contexts/userAuthorContext";

function UserProfile() {
  const { currentUser } = useContext(userAuthorContextObj);

  if (!currentUser.isActive) {
    return <h2>Your account is blocked. Please contact admin.</h2>;
  }

  return (
    <div>
     
      <ul className="d-flex justify-content-around list-unstyled fs-1">
        <li className="nav-item">
          <Link to ='articles' className="nav-link">Articles</Link>
        </li>
       
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  )
}

export default UserProfile