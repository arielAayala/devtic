"use client";

import React, { useState } from "react";
import RowTableOrganizaciones from "./rowTableOrganizaciones";
import { useEffect } from "react";
import ButtonAddOrganizaciones from "./buttonAddOrganizaciones";

function TableOrganizaciones() {
	const [Organizaciones, setOrganizaciones] = useState([]);

	const obtenerOrganizaciones = () => {
		fetch("http://localhost/devtic/api/ListarOrganizaciones.php", {
			method: "GET",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al cargar los Organizaciones", {
						cause: res,
					});
				}
				return res.json();
			})
			.then((res) => {
				setOrganizaciones(res);
			})
			.catch((error) => {
				console.error(error.error);
				Organizaciones([]);
			});
	};

	useEffect(() => {
		obtenerOrganizaciones();
	}, []);

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<ButtonAddOrganizaciones obtenerOrganizaciones={obtenerOrganizaciones} />
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
					Organizaciones
					<p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						Listado donde se visualiza los Organizaciones adheridos al sistema.
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
							<span className="sr-only">Borrar</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{Organizaciones.map((i) => (
						<RowTableOrganizaciones
							key={i.idOrganizaciones}
							obtenerOrganizaciones={obtenerOrganizaciones}
							idOrganizaciones={i.idOrganizaciones}
							nombrePersona={i.nombrePersona}
							nombreEspecialidad={i.nombreEspecialidad}
							prioridadOrganizaciones={i.prioridadOrganizaciones}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TableOrganizaciones;
