import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        try {
            console.log("Intentando iniciar sesión con", form);
            const success = await actions.login(form);
            if (success) {
                console.log("Inicio de sesión exitoso, redirigiendo...");
                navigate("/private");
            } else {
                console.error("Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión", error);
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            {store.error && <p className="error-message">{store.error}</p>}
        </div>
    );
};
