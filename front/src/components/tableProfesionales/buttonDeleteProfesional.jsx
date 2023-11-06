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
			<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
    			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
  			</svg>
		</button>
	);
}

export default ButtonDeleteProfesional;
