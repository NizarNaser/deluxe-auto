
import { useState } from "react"
import "./LoginPopup.css"
import { assets } from "../../assets/assets"
import { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"
import axios from "axios"
import { jwtDecode } from "jwt-decode"; 
// eslint-disable-next-line react/prop-types
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, loading, setLoading } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChengeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
  
    const dataToSend = currState === "Login"
      ? { email: data.email, password: data.password }
      : data;
  
    try {
      const response = await axios.post(newUrl, dataToSend);
      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
      
        const decoded = jwtDecode(token);
        console.log("Welcome", decoded.name); // طبع الاسم
      
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("An error occurred. Please try again.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name="name" onChange={onChengeHandler} value={data.name} type="text" placeholder="Your name" required />}

          <input name="email" onChange={onChengeHandler} value={data.email} type="email" placeholder="Your Email" required />
          <input name="password" onChange={onChengeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }


      </form>
    </div>
  )
}

export default LoginPopup