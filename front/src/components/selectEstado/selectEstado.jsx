"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useState } from "react";

function SelectEstado(props) {
	const { idDemanda, obtenerDemanda, idEstado } = props;

	const { crearAlert } = useAlertContext();
	const [estado, setEstado] = useState({
		idEstado: idEstado,
		idDemanda: idDemanda,
	});

	const handleChange = (e) => {
		setEstado({ ...estado, idEstado: e.target.value });
	};

	const handleSubmitEstado = (e) => {
		e.preventDefault();
		if (estado.idEstado != idEstado) {
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
		}
	};

	return (
		<form
			onSubmit={handleSubmitEstado}
			className=" flex items-center justify-between "
		>
			<div className="relative inline-center">
				<select
					id="idProfesional"
					defaultValue={idEstado}
					onChange={handleChange}
					className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
				>
					<option>Seleccione un estado</option>
					<option value={1}>Pendiente</option>
					<option value={2}>En curso</option>
					<option value={3}>Terminado</option>
					<option value={4}>Demorado</option>
				</select>
			</div>
			<button
				type="submit"
				className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
			>
				Cambiar
			</button>
		</form>
	);
}

export default SelectEstado;
