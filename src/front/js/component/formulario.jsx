import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";





export const Registro = () => {
    const { store, actions, } = useContext(Context);
    const navigate = useNavigate();

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
            console.error("Todos los campos son obligatorios");
            return;
        }
        try {
            console.log("enviando datos de registro", form);
            const succes = await actions.login(form, navigate);
            if (succes) {
                console.log("registro valido, redirigiendo....");
                navigate("/private");
            } 
        } catch (error) {
            console.error("Error al registrar el usuario", error)
            
        }
     };
    return (
        <div className="bodygeneral">
            <div className="bodyregister ">
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
              {store.error && <p className="mensaje de error">{store.error}</p>} 
            </div >
        </div>
    );
};