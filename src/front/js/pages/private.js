import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

export const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() =>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        } else {
            actions.getUserData();
            
        }
    }, []);
    console.log("Usuario en store:", store.user)

    return (

        <div>
            <h1>Bienvenido {store.user?.email || "Usuario"}</h1>
        </div>
    )
}