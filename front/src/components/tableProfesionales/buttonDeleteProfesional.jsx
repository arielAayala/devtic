"use client";
import { useAlertContext } from "@/context/alertContext";
import React from "react";

function ButtonDeleteProfesional(props) {
	const { crearAlert } = useAlertContext();

	const { idProfesional, obtenerProfesionales } = props;

	const handleDeleteProfesional = () => {
		fetch("http://localhost/devtic/api/BorrarProfesional.php", {
			body: JSON.stringify({ idProfesional: idProfesional }),
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
				obtenerProfesionales();
			})
			.catch((e) => {
				crearAlert({ error: e.message });
			});
	};

	return (
		<button
			type="button"
			onClick={handleDeleteProfesional}
			className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
		>
			Borrar
		</button>
	);
}

export default ButtonDeleteProfesional;
