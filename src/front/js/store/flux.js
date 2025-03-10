import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth: localStorage.getItem('token') || false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			logout: ()=>{
				localStorage.removeItem('token');
				setStore({auth:false, token: null})

			},
			

			getUserData: async () => {
				try {
					const resp = await fetch(
						"https://glorious-broccoli-7vr764xwv5gxhx467-3001.app.github.dev/api/protected",
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					);
			
					if (!resp.ok) throw new Error("Error obteniendo datos del usuario");
			
					const data = await resp.json();
					console.log("Datos del usuario recibidos:", data);
					localStorage.setItem("token:", data.token)
			
					setStore({ user: data.user, auth: true }); 
				} catch (error) {
					console.error("Error en getUserData:", error);
					setStore({ auth: false }); 
				}
			},
			
			
			register: async (formData) => {
				try {
					const resp = await fetch('https://glorious-broccoli-7vr764xwv5gxhx467-3001.app.github.dev/api/register', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(formData),
					});
			
					if (!resp.ok) {
						const errorData = await resp.json();
						console.error("Error registrando usuario:", errorData);
						return false;
					}
			
					const data = await resp.json();
					console.log("Usuario registrado exitosamente:", data);
					return true;  
				} catch (error) {
					console.error("Error en el registro:", error);
					return false;
				}
			},
			
			

			login: async formData=> {
				try{
					const resp = await fetch('https://glorious-broccoli-7vr764xwv5gxhx467-3001.app.github.dev/api/login',
						{method:'POST',
						headers:{
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
				})
					if (!resp.ok) throw new Error ("Error logeando")
					const data = await resp.json()
					console.log(data)
					localStorage.setItem('token', data.token)
					setStore({auth: true, token: data.token})
					await getActions().getUserData();
					return true;
				} catch (error){
					console.log(error);
					return false;
				}
			},

			
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
