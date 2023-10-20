"use client";
import React, {
	useContext,
	createContext,
	useState,
	useMemo,
	useCallback,
} from "react";
import { useAlertContext } from "./alertContext";

const authContext = createContext(null);

function AuthContextProvider({ children }) {
	const { crearAlert } = useAlertContext();

	const [user, setUser] = useState(null);

	const iniciarSesion = useCallback((inputs) => {
		fetch("http://localhost/devtic/api/IniciarSesion.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(inputs),
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("ocurrio un error", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
				setUser(res.data);
			})
			.catch((error) => {
				const errorMessage = error.cause.error || "Error desconocido";
				crearAlert({ error: errorMessage });
			});
	}, []);

	const iniciarSesionConCookies = useCallback(() => {
		fetch("http://localhost/devtic/api/IniciarSesion.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Error al iniciar sesion");
				}
				return res.json();
			})
			.then((res) => {
				setUser(res.data);
				crearAlert(res);
			})

			.catch((error) => {
				setUser(null);
			});
	}, []);

	const cerrarSesion = useCallback(() => {
		fetch("http://localhost/devtic/api/CerrarSesion.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error");
				}
				return res.json();
			})
			.then((res) => {
				setUser(null);
				crearAlert(res);
			})

			.catch((error) => {
				setUser(null);
			});
	}, []);

	const values = useMemo(
		() => ({
			user,
			iniciarSesion,
			cerrarSesion,
			iniciarSesionConCookies,
		}),
		[user, iniciarSesion, cerrarSesion, iniciarSesionConCookies]
	);

	return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

const useAuthContext = () => useContext(authContext);

export { AuthContextProvider, useAuthContext };
