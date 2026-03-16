
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export  default function AuthProvider ({children}){
    const [user ,setUser ] = useState( ()=>{
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser):null;
    })


    const login = (username , password )=>{

         if(username=== "testuser" && password === "Test123"){
       
             const userData = {username};
             setUser(userData);
             localStorage.setItem("user",JSON.stringify(userData));
             return true;
         }
         return false;
    }


    const logout = ( )=>{
        setUser(null);
        localStorage.removeItem("user");
    }

    const value = {
        user ,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={ value}>
        { children}
        </AuthContext.Provider>
    )
}
