import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query'

import Header from './CommonComponent/Header'
import Register from './Pages/Auth/Register'
import LogIn from './Pages/Auth/LogIn'
import UpdatePassword from './Pages/Auth/UpdatePassword';
import AllBlogs from './Pages/Blogs/AllBlogs';
import BlogDetails from './Pages/Blogs/BlogDetails';
import BlogsByCategory from './Pages/Blogs/BlogsByCategory';
import Team from './Pages/PageContent/Team';
import Home from './Pages/PageContent/Home';
import Testimonial from './Pages/PageContent/Testimonial';
import Course from './Pages/PageContent/Course';
import Contact from './Pages/PageContent/Contact';
import Profile from './Pages/PageContent/Profile';
// Create a client
const queryClient = new QueryClient()

function App() {
  const PrivateRoute=({children})=>{
    const token=localStorage.getItem("auth") || sessionStorage.getItem("auth")
    return token !==null && token !==undefined ?(children):<Navigate to="/login" />
  }

  const public_route=[
    {
        path:'/',
        component:<Home/>
    },{
      path:'/home',
      component:<Home/>
  },
    {
      path:'/register',
      component:<Register/>
    },
    {
        path:'/login',
        component:<LogIn/>
    },{
      path:'/team',
      component:<Team/>
  },{
    path:'/testimonial',
    component:<Testimonial/>
},{
  path:'/contact',
  component:<Contact/>
}
    
  ]

  const protected_route=[
    {
      
        path:'/blogs',
        component:<AllBlogs/>
    },{
      
      path:'/blog-details/:id',
      component:<BlogDetails/>
  },{
      
    path:'/category/:categoryId',
    component:<BlogsByCategory/>
},
    {
      
      path:'/update-password',
      component:<UpdatePassword/>
  },{
    path:'/course',
    component:<Course/>
  },{
    path:'/profile',
    component:<Profile/>
  }
    
  ]

  return (
   <>
   <ToastContainer/>
   <QueryClientProvider client={queryClient}>
  <Router>
    <Routes>
    {
      public_route?.map((item)=><Route path={item?.path} element={item?.component} />)

    }
      {
      protected_route?.map((item)=><Route path={item?.path} element={<PrivateRoute>{item?.component}</PrivateRoute>} />)

    }
    </Routes>
   
  </Router>
  </QueryClientProvider>
   </>
  );
}

export default App;
