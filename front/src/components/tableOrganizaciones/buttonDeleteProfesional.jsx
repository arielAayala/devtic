"use client";
import { useAlertContext } from "@/context/alertContext";
import React from "react";

function ButtonDeleteOrganizaciones(props) {
	const { crearAlert } = useAlertContext();

	const { idOrganizaciones, obtenerOrganizaciones } = props;

	const handleDeleteOrganizaciones = () => {
		fetch("http://localhost/devtic/api/BorrarOrganizaciones.php", {
			body: JSON.stringify({ idOrganizaciones: idOrganizaciones }),
			credentials: "include",
			method: "POST",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al Borrar la demanda");
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
				obtenerOrganizaciones();
			})
			.catch((e) => {
				crearAlert({ error: e.message });
			});
	};

	return (
		<button
			type="button"
			onClick={handleDeleteOrganizaciones}
			className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
		>
			Borrar
		</button>
	);
}

export default ButtonDeleteOrganizaciones;
