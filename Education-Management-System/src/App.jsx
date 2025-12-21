import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"


function App() {
  

  return (
    <>
    {/* <Login /> */}
    {/* <Home /> */}
     {/* <Navbar /> */}
    {/* <About /> */}
    {/* <Contact /> */}
    <Profile />

     {/* <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
     </Routes> */}
     
    </>
  )
}

export default App
