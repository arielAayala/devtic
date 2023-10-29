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
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al Borrar la demanda", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
				obtenerOrganizaciones();
			})
			.catch((e) => {
				const errorMessage = e.cause?.error || e.message;
				crearAlert({ error: errorMessage });
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
