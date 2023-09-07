"use client";
import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useMemo,
} from "react";

const alertContext = createContext(null);

function AlertContextProvider({ children }) {
	const [alert, setAlert] = useState(null);

	const crearAlert = useCallback((res) => {
		setAlert(res.msg ? { msg: res.msg } : { error: res.error });
	}, []);

	const cerrarAlert = useCallback(() => {
		setAlert(null);
	}, []);

	const values = useMemo(
		() => ({
			alert,
			crearAlert,
			cerrarAlert,
		}),
		[alert, cerrarAlert, crearAlert]
	);

	return (
		<alertContext.Provider value={values}>{children}</alertContext.Provider>
	);
}

const useAlertContext = () => useContext(alertContext);

export { useAlertContext, AlertContextProvider };
