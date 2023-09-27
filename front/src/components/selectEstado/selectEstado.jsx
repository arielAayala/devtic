"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useState } from "react";

function SelectEstado(props) {
	const { idDemanda, obtenerDemanda } = props;

	const { crearAlert } = useAlertContext();
	const [estado, setEstado] = useState({
		idEstado: null,
		idDemanda: idDemanda,
	});

	const handleChange = (e) => {
		setEstado({ ...estado, idEstado: e.target.value });
	};

	const handleSubmitEstado = (e) => {
		e.preventDefault();
		fetch("http://localhost/devtic/api/CambiarEstado.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(estado),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						"Ocurrio un error al cambiar el estado de la demanda"
					);
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
			})
			.then(() => {
				obtenerDemanda();
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	return (
		<form onSubmit={handleSubmitEstado}>
			<select
				id="idProfesional"
				onChange={handleChange}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option>Seleccione un estado</option>
				<option value={1}>Pendiente</option>
				<option value={2}>En curso</option>
				<option value={3}>Terminado</option>
				<option value={4}>Demorado</option>
			</select>
			<button
				type="submit"
				className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Cambiar el estado
			</button>
		</form>
	);
}

export default SelectEstado;
