import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to='/registro'><h2>
				REGISTRO
			</h2>
			</Link>
			<Link to='/login'><h2>
				LOGIN
			</h2>
			</Link>
			

			
		</div>
	);
};
