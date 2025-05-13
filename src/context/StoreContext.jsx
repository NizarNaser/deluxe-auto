/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
const StoreContextProvider = (props) => {
    const url = import.meta.env.VITE_API_URL;
    const [token, setToken] = useState("");
    const [car_list, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");


    const fetchCarList = async () => {
        const response = await axios.get(url + "/api/car/list")
        if (response.data.success) {
            setCarList(response.data.data)
            setLoading(false);
        } else {
            toast.error("Error fetching categories");
            setLoading(false);

        }
    }


    useEffect(() => {

        async function loadData() {
            await fetchCarList()
            if (localStorage.getItem("token")) {
                const savedToken = localStorage.getItem("token");
                setToken(savedToken);
              
                const decoded = jwtDecode(savedToken);
                setUserName(decoded.name); // حفظ اسم المستخدم
              }
              
        }
        loadData()
    }, [])
    const contextValue = {
        car_list,
        url,
        token,
        setToken,
        loading, 
        setLoading,
        userName,
        setUserName,

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )


}

export default StoreContextProvider;