import { useState } from 'react';
import './App.css'
import  PublicRoute from './components/Auth/PublicRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import ForgetPassword from './components/Auth/Forgetpassword';
import ResetPassword from './components/Auth/ResetPassword';
import { BrowserRouter,Route,Routes } from 'react-router';
import { ToastContainer,Bounce } from 'react-toastify';
import UserLayout from './components/Layout/User/UserLayout';
import UserDashboardPage from './pages/User/Dashboard';
import UserProfilePage from './pages/User/Profile';
import EditProfilePage from './pages/User/EditProfile';
import CreatePostPage from './pages/User/CreatePost';
import EditPostPage from './pages/User/EditPost';
import MyPostPage from './pages/User/MyPost';
import ExplorePage from './pages/User/Explore';
import ViewProfilePage from './pages/User/ViewProfile';
import ChatPage from './pages/User/Chat';
function App() {
  return (
      <>
      <BrowserRouter>
      <Routes >
        <Route path='/forget-password' element={<PublicRoute><ForgetPassword/></PublicRoute>}/>
        <Route path='/reset-password' element={<PublicRoute><ResetPassword/></PublicRoute>}/>
        <Route path='/signin' element={<PublicRoute><Signin/></PublicRoute>}/>
        <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
        <Route element={<ProtectedRoute><UserLayout/></ProtectedRoute>}>
        <Route path='/explore'  element={<ExplorePage/>}/>
        <Route path='/chat'  element={<ChatPage/>}/>
        <Route path='/chat/:id'  element={<ChatPage/>}/>
        <Route path='/'  element={<UserDashboardPage/>}/>
        <Route path='/edit-post/:id'  element={<EditPostPage/>}/>
        <Route path='/view-profile/:id'  element={<ViewProfilePage/>}/>
        <Route path='/create-post'  element={<CreatePostPage/>}/>
        <Route path='/mypost'  element={<MyPostPage/>}/>
        <Route path='/edit-profile'  element={<EditProfilePage/>}/>
        <Route path='/profile'  element={<UserProfilePage/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      </>
  )
}

export default App
