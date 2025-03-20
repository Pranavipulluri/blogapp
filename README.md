# 🚀 BlogSpace Role Selection Module

The **BlogSpace Role Selection Module** is a critical component that allows users to choose their preferred role — either **Author** or **User** — upon logging in. The module ensures smooth navigation and accurate role assignment, enhancing the user experience by directing them to the appropriate dashboards.

---

## 📚 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Error Handling](#-error-handling)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Features
✅ **Role-Based Navigation:**  
- Users can select a **Buyer** or **Seller** role, which dynamically redirects them to the appropriate dashboard.

✅ **Local Storage Integration:**  
- Stores user information and role in `localStorage` to maintain session persistence.

✅ **API Communication:**  
- Sends a POST request to update the user's role in the backend.

✅ **Error Handling & Validation:**  
- Redirects unauthorized users to the login page and displays error messages for failed role updates.

✅ **Responsive UI:**  
- Optimized for various devices with a clean and minimal interface.

---

## 🛠️ Tech Stack
- **Frontend:** React, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Clerk  

---

## 📂 Folder Structure
/blogspace-role-selection ├── /public │ └── index.html ├── /src │ ├── /components │ │ └── RoleSelection.js │ ├── /contexts │ │ └── userAuthorContext.js │ ├── /pages │ │ ├── Home.js │ │ └── Dashboard.js │ ├── /utils │ │ └── api.js │ ├── App.js │ ├── index.js │ └── styles.css └── package.json


---

## ⚡ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/blogspace-role-selection.git
```

### 2. Navigate to the project directory
```bash
cd blogspace-app
```

### 3. Install dependencies
```bash
npm install
```

### 4. Create a `.env` file
Add the following environment variables in the `.env` file:
```
REACT_APP_API_URL=http://localhost:4000/api
```

### 5. Run the application
```bash
npm start
```

---

## 🚀 Usage

1. **Sign In:** The user logs into the application using Clerk Authentication.  
2. **Role Selection:** After login, the user selects a role (`Author` or `User`).  
3. **API Call:** The selected role is sent to the backend API to update the user's record.  
4. **Redirection:** Based on the selected role, the user is redirected to the appropriate dashboard (`/dashboard`).  

---

## 🔥 API Endpoints

### 1. Update User Role
```http
POST /api/users/set-role/:userId
```
#### Request Body
```json
{
  "role": "autor" or "reader"
}
```
#### Success Response
```json
{
  "success": true,
  "payload": {
    "role": "buyer"
  }
}
```
#### Error Response
```json
{
  "success": false,
  "error": "Invalid user ID or role"
}
```

---

## ⚡ Error Handling
- **Authentication Failure:** Redirects unauthorized users to the login page.
- **Invalid API Response:** Displays an error message if the API response is not as expected.
- **API Connection Error:** Logs the error message if the API call fails.

---

## 🚧 Future Enhancements
- 📝 Add role change functionality post-login.  
- 📚 Implement role-based content recommendations.  
- 📢 Enable notifications based on user role.  
