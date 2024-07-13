import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
				<Route path='/' element={ <Home /> } />
				<Route path='/signup' element={<SignUp/>} />
				<Route path='/login' element={ <Login /> } />
			</Routes>
      </div>
      </Router>
  )
}

export default App
