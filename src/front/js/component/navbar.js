import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	

	const handleLogout =()=>{
		localStorage.removeItem("token");
		actions.logout();
		navigate('/login')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					
					{localStorage.getItem('token') && (
  <button className="btn-exit btn btn-warning mx-5" onClick={() => handleLogout('/')}>
    Salida por aquí
  </button>
)}



				</div>
			</div>
		</nav>
	);
};
