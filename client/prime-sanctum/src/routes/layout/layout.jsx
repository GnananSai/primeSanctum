import { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar'
import './layout.scss'
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate
  } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


function Layout(){
    return(
        <div className="layout">
        <div className="navbar">
        <Navbar/>
        </div>
  
        <div className="content">
          
         <Outlet/>
        </div>
       
      </div>
    )
}

function RequireAuth(){
  const {currentUser} = useContext(AuthContext)

  if(!currentUser){
    
  }

  return(
      !currentUser ?( <Navigate to="/login"/>) :
      (<div className="layout">
      <div className="navbar">
      <Navbar/>
      </div>

      <div className="content">
        
       <Outlet/>
      </div>
     
    </div>
      )
  )
}

export {Layout,RequireAuth};