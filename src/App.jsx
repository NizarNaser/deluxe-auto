import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home/Home"
import Footer from "./components/footer/Footer"
import { useState } from "react"
import LoginPopup from "./components/loginPopup/LoginPopup"
import OneCar from "./pages/OneCar/OneCar"
import Header from "./components/Header/Header"



function App() { 

  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
     
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/one-car/:id" element={<OneCar/>}/>
        

      </Routes>
     <Footer/>
    </div> 

    </>
  )
}

export default App
