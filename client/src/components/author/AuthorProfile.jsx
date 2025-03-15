import React ,{useContext} from 'react'
import {NavLink,Outlet} from 'react-router-dom'
import { userAuthorContextObj } from "../../contexts/userAuthorContext";

function AuthorProfile() {
  const { currentUser } = useContext(userAuthorContextObj);

  if (!currentUser.isActive) {
    return <h2>Your account is blocked. Please contact admin.</h2>;
  }

  return (
    <div className='author-profile'>
      <ul className="d-flex justify-content-around list-unstyled fs-3">
        <li className="nav-item">
          <NavLink to='articles' className="nav-link">Articles</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='article' className="nav-link">Add new Article</NavLink>
        </li>
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile