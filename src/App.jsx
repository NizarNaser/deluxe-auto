import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home/Home"
import Footer from "./components/footer/Footer"
import { useState } from "react"
import LoginPopup from "./components/loginPopup/LoginPopup"
import OneCar from "./pages/OneCar/OneCar"
import Header from "./components/Header/Header"



function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      <Header setShowLogin={setShowLogin} />

      {/* Login Popup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Routes>
      <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
      <Route path="/one-car/:id" element={<OneCar />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App
