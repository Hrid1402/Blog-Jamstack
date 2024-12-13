import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Post from './Post.jsx';
import NotFound from './NotFound.jsx';
import './styles/index.css'
import Login from './Login.jsx';
import Editor from './PostEditor.jsx';
import SignUp from './SignUp.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login/",
    element: <Login/>
  },
  {
    path: "/sign-up/",
    element: <SignUp/>
  },
  {
    path: "/post/:id",
    element: <Post />
  },
  {
    path: "/editor/:id?",
    element: <Editor/>
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
