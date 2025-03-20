import { useContext, useEffect, useState } from 'react'
import { userAuthorContextObj } from '../../contexts/userAuthorContext'
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj)
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState('');
  const navigate = useNavigate();

  

  const RoleSelection = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleRoleSelect = async (role) => {
        if (!currentUser) return;

        try {
            const response = await axios.post(
                `http://localhost:5000/api/users/set-role/${currentUser._id}`,
                { role }
            );

            if (response.data && response.data.payload) {
                const updatedUser = { ...currentUser, role };
                setCurrentUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                navigate("/dashboard");
            } else {
                console.error("Unexpected API response format", response.data);
            }
        } catch (error) {
            console.error("Error updating role", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Select Your Role</h2>
            <button onClick={() => handleRoleSelect("buyer")}>Buyer</button>
            <button onClick={() => handleRoleSelect("seller")}>Seller</button>
        </div>
    );
};


  useEffect(() => {
    if (isSignedIn === true) {
      console.log("User Data:", user); // Log user data for debugging
      setCurrentUser({
        ...currentUser,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.emailAddresses[0].emailAddress,
        profileImageUrl: user?.imageUrl
      })
    }
  }, [isLoaded]);

  useEffect(() => {
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">BlogSpace</h1>
          {isSignedIn && (
            <div className="flex items-center space-x-3">
              <img 
                src={user?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200" 
                alt="Profile" 
              />
              <span className="font-medium">{user?.firstName}</span>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Guest View */}
        {isSignedIn === false && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to BlogSpace</h2>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <img 
                      src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                      alt="Blog" 
                      className="rounded-lg shadow-md w-full h-64 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Share Your Voice</h3>
                    <p className="text-gray-600 mb-4">Join our community of writers and readers. Create and discover amazing content tailored to your interests.</p>
                    <p className="text-gray-600 mb-4">Whether you're looking to share your expertise or explore new ideas, BlogSpace is the perfect platform for you.</p>
                    <button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                      onClick={() => window.location.href = "/Signin"}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Write</h3>
                <p className="text-gray-600">Share your thoughts, knowledge, and stories with our growing community.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Connect</h3>
                <p className="text-gray-600">Engage with other writers and readers who share your interests.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Discover</h3>
                <p className="text-gray-600">Explore a wide range of topics and perspectives from our diverse authors.</p>
              </div>
            </div>
          </div>
        )}

        {/* Signed In View */}
        {isSignedIn === true && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-8">
                <img 
                  src={user?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 mx-auto" 
                  alt="Profile" 
                />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">Welcome, {user?.firstName}!</h2>
                <p className="text-gray-600 mt-2">How would you like to use BlogSpace today?</p>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => onSelectRole('author')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
                >
                  <span className="mr-2">Continue as Author</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => onSelectRole('user')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
                >
                  <span className="mr-2">Continue as Reader</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      
    </div>
  )
}

export default Home
