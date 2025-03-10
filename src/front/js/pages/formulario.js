import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import  "../../styles/home.css"
import { useEffect } from "react";





export const Registro = () => {
    const { store, actions, } = useContext(Context);
    const navigate = useNavigate();
    const [error, setError] = useState(null);


    const [form, setForm] = useState({
       
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError("Todos los campos son obligatorios");
            console.error("Todos los campos son obligatorios");
            return;
        }
        try {
            console.log("enviando datos de registro", form);
            const succes = await actions.register(form);
            if (succes) {
                console.log("Registro exitoso, redirigiendo al login...");
                navigate("/login");  
            } else {
                console.error("Error en el registro, revisa los datos.");
            }
            
        } catch (error) {
            console.error("Error al registrar el usuario", error)
            
        }

        
            }
            useEffect(()=>{
                if (store.user){
                    navigate("/login)");
                }
            }, [store.auth])
        
     
    return (
        <div className="bodygeneral">
            <div className="bodyRegister ">
                <h1 className="titleregister">Registrate</h1>
                <form className="cuadroRegistro" onSubmit={handleSubmit}>
                
                    <div className="emailRegistro">
                        <label className="emaillabel">Email</label>
                        <input className="inputemail"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="contraseñaRegistro">
                        <label className="contralabel">Contraseña</label>
                        <input className="inputContra" 
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="butonregister" type="submit">Registrate</button>
                </form>
              {store.error && <p className="mensaje-error">{store.error}</p>} 
            </div >
        </div>
    );
};