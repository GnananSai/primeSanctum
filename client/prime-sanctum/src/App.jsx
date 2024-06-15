// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Navbar from "./components/navbar/Navbar.jsx"
import HomePage from "./routes/homePage/homePage.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ListPage from "./routes/listPage/listPage.jsx";
import Layout from "./routes/layout/layout.jsx";
import Login from "./routes/login/login.jsx";
import SinglePage from "./routes/singlePage/singlePage.jsx";
import RegisterPage from "./routes/register/register.jsx";
import PropertyForm from "./routes/post/post.jsx"

function App() {
  //const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>

        },

        {
          path:"/list",
          element:<ListPage/>
          
        },

        {
          path:"/login",
          element:<Login/>
          
        },

        {
          path:"/register",
          element:<RegisterPage/>
          
        },

        {
          path:"/:id",
          element:<SinglePage/>
          
        },

        {
          path:"/post",
          element:<PropertyForm/>
        }
      ]
    }
   
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App
