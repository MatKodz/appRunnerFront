import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Runs from './Runs.jsx';
import AddRun from './addRun.jsx';
import Profile from './Profile.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/runs",
    element: <Runs />,
  },
  {
    path: "/add-run",
    element: <AddRun />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
