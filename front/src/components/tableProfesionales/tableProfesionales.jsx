"use client";

import React, { useState } from "react";
import RowTableProfesionales from "./rowTableProfesionales";
import { useEffect } from "react";
import ButtonAddProfesional from "./buttonAddProfesional";

function TableProfesionales() {
	const [profesionales, setProfesionales] = useState([]);

	useEffect(() => {
		fetch("http://localhost/devtic/api/ListarProfesionales.php", {
			method: "GET",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al cargar los profesionales");
				}
				return res.json();
			})
			.then((res) => {
				setProfesionales(res);
			})
			.catch((error) => {
				console.error(error);
				profesionales([]);
			});
	}, []);

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<ButtonAddProfesional />
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
					Profesionales
					<p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						Listado donde se visualiza los profesionales adheridos al sistema.
					</p>
				</caption>
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th
							scope="col"
							className="px-6 py-3"
						>
							Nombre y apellido
						</th>
						<th
							scope="col"
							className="px-6 py-3"
						>
							Especialidad
						</th>
						<th
							scope="col"
							className="px-6 py-3"
						>
							Prioridad
						</th>
						<th
							scope="col"
							className="px-6 py-3"
						>
							<span className="sr-only">Actualizar</span>
						</th>
						<th
							scope="col"
							className="px-6 py-3"
						>
							<span className="sr-only">Borrar</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{profesionales.map((i) => (
						<RowTableProfesionales
							key={i.idProfesional}
							idProfesional={i.idProfesional}
							nombrePersona={i.nombrePersona}
							nombreEspecialidad={i.nombreEspecialidad}
							prioridadProfesional={i.prioridadProfesional}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TableProfesionales;
