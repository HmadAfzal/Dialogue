import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./redux/hooks";
import { selectUser } from "./redux/userslice";


function App() {
  const user = useAppSelector(selectUser);



  return (
    <Router>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={user!==null ?   <Home /> : <Navigate to={'/login'}/> } />
          <Route path='/signup' element={user==null ?  <SignUp /> : <Navigate to={'/'}/> } />
          <Route path='/login' element={ user==null ?  <Login /> : <Navigate to={'/'}/> } />
        </Routes>
        <Toaster toastOptions={{
          style: {
            background: '#1D232A',
            color: 'white'
          }
        }} />
      </div>
    </Router>
  )
}

export default App


// todo: select convo, getmessage, sendmessage, searchuser