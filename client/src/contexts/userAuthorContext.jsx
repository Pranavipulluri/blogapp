import {createContext, useState} from 'react'
export const userAuthorContextObj=createContext();
function userAuthorContext({children}) {

    let [currentUser,setCurrentUser]=useState({
        firstName:'',
        lastName:'',
        email:'',
        profileImageUrl:'',
        role:'',
        isActive: true
    })
  return (
    <userAuthorContextObj.Provider value={{currentUser,setCurrentUser}}>
        {children}
    </userAuthorContextObj.Provider>
  )
}

export default userAuthorContext