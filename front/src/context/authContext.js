"use client";
import React, {
	useContext,
	createContext,
	useState,
	useMemo,
	useCallback,
} from "react";

const authContext = createContext(null);

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	console.log(user);

	const iniciarSesion = useCallback((inputs) => {
		fetch("http://localhost/devtic/api/IniciarSesion.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(inputs),
		})
			.then((res) => res.json())
			.then((res) => setUser(res.data));
	}, []);

	const iniciarSesionConCookies = useCallback(() => {
		fetch("http://localhost/devtic/api/IniciarSesion.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => res.json())
			.then((res) => setUser(res.data));
	}, []);

	const values = useMemo(
		() => ({
			user,
			iniciarSesion,
			iniciarSesionConCookies,
		}),
		[user, iniciarSesion]
	);

	return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

const useAuthContext = () => useContext(authContext);

export { AuthContextProvider, useAuthContext };
