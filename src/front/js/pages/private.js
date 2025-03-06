import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useSyncExternalStore } from "react";
import { Context } from "../store/appContext";

export const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() =>{
        if(!store.auth){
            navigate('/login');
        }
    }, [store.auth, navigate]);

    return (

        <div>
            <h1>Bienvenido {store.user?.email}</h1>
        </div>
    )
}