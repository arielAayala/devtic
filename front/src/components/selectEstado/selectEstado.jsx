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
			<div className="relative inline-center">
			<svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
			<select
				id="idProfesional"
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
				className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
			>
				Cambiar estado
			</button>
		</form>
	);
}

export default SelectEstado;
