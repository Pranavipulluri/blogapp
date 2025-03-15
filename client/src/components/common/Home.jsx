import {useContext,useEffect,useState} from 'react'
import {userAuthorContextObj} from '../../contexts/userAuthorContext'
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Home() {

  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
  const{isSignedIn,user,isLoaded}=useUser()
  const [error,setError]=useState('');
  const navigate=useNavigate();
  const [role,setRole]=useState('')

  // console.log("isSignedIn:",isSignedIn)
  // console.log("isLoaded:",isLoaded)
  console.log("User:",user)

 async function onSelectRole(e){
  // clear error message
     setError('')
    const selectedRole=e.target.value;
    currentUser.role=selectedRole;
    let res=null;

    try{
      if(selectedRole==='author'){
        res=await axios.post('http://localhost:3000/author-api/author',currentUser)
        let {message,payload}=res.data;
        if(message==='author'){
          setCurrentUser({...currentUser, ...payload})
          //save user to localstorage
          localStorage.setItem("currentuser",JSON.stringify(payload))
        }else{
          setError(message)
        }
      }
      if(selectedRole==='user'){
        res=await axios.post('http://localhost:3000/user-api/user',currentUser)
        let {message,payload}=res.data;
        if(message==='user'){
          setCurrentUser({...currentUser, ...payload})
          //save user to localstorage
          localStorage.setItem("currentuser",JSON.stringify(payload))
        }else{
          setError(message)
        }
      }
    }catch(err){
      setError(err.message);
    }
  }

  useEffect(()=>{
    if (isSignedIn === true) {
    setCurrentUser({
      ...currentUser,
      firstName:user?.firstName,
      lastName:user?.lastName,
      email:user?.emailAddresses[0].emailAddress,
      profileImageUrl:user?.imageUrl
    })
  }},[isLoaded]);
   useEffect(() => {
    if (currentUser?.role === "author" && error.length === 0) {
      console.log("first")
      navigate(`/author-profile/${currentUser.email}`);
    }
   if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    
  }, [currentUser]);
  return (
    <div className='container'>
      {
        isSignedIn===false && <div>
          <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi minus nemo quasi rerum aliquid cumque quidem dolores natus velit. Repudiandae omnis eligendi quasi ipsa quos dolores quis ipsam itaque hic enim veritatis labore, autem perspiciatis praesentium ex tempore voluptate quisquam!</p>
          <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi minus nemo quasi rerum aliquid cumque quidem dolores natus velit. Repudiandae omnis eligendi quasi ipsa quos dolores quis ipsam itaque hic enim veritatis labore, autem perspiciatis praesentium ex tempore voluptate quisquam!</p>
          <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi minus nemo quasi rerum aliquid cumque quidem dolores natus velit. Repudiandae omnis eligendi quasi ipsa quos dolores quis ipsam itaque hic enim veritatis labore, autem perspiciatis praesentium ex tempore voluptate quisquam!</p>
        
        </div>
      }
      {
        isSignedIn===true &&
        <div>
           <div className='d-flex align-items-center bg-info p-3 justify-content-evenly'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" width='100px' className='rounded-circle' alt="" />
          <p className="display-6">{user.firstName}</p>

        </div>
        <p className="lead">Select role </p>
        {error.length!==0 && (
          <p className='text-danger fs-5 ' style={{fontFamily:"sans-serif"}}>
          {error}
          </p>
          )}
        <div className='d-flex role-radio py-3 justify-content-around'>
          <div className="form-check me-6">
            <input type="radio" name='role' value='author' id='author' className='form-check-input' onChange={onSelectRole} />
            <label htmlFor="author" className='form-check-label ms-2 '>Author</label>
          </div>
          <div className="form-check ">
            <input type="radio" name='role' value='user' id='user' className='form-check-input' onChange={onSelectRole} />
            <label htmlFor="user" className='form-check-label ms-2'>User</label>
          </div>
        </div>
        </div>

      }
    </div>
  )
}

export default Home