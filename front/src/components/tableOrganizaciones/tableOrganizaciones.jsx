"use client";

import React, { useState } from "react";
import RowTableOrganizaciones from "./rowTableOrganizaciones";
import { useEffect } from "react";
import ButtonAddOrganizaciones from "./buttonAddOrganizaciones";
import { useAlertContext } from "@/context/alertContext";

function TableOrganizaciones() {
	const [Organizaciones, setOrganizaciones] = useState([]);
	const { crearAlert } = useAlertContext();

	const obtenerOrganizaciones = () => {
		fetch("http://localhost/devtic/api/ListarOrganizaciones.php", {
			method: "GET",
			credentials: "include",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al cargar los Organizaciones", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				setOrganizaciones(res);
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				crearAlert({ error: errorMessage });
				setOrganizaciones([]);
			});
	};

	useEffect(() => {
		obtenerOrganizaciones();
	}, []);

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<ButtonAddOrganizaciones obtenerOrganizaciones={obtenerOrganizaciones} />
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
				<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
					Organizaciones
					<p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						Listado donde se visualiza las Organizaciones adheridas al sistema.
					</p>
				</caption>
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th
							scope="col"
							className="px-6 py-3"
						>
							Nombre
						</th>
						<th
							scope="col"
							className="px-6 py-3"
						>
							CueAnexo
						</th>
						<th
							scope="col"
							className="px-6 py-3"
						>
							Departamento
						</th>
						<th
							scope="col"
							className="px-6 py-3"
						>
							Localidad
						</th>

						<th
							scope="col"
							className="px-6 py-3"
						>
							Dirreción
						</th>

						<th
							scope="col"
							className="px-6 py-3"
						>
							Telefono
						</th>

						<th
							scope="col"
							className="px-6 py-3"
						>
							<span className="sr-only">Actualizar</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{Organizaciones.map((i) => (
						<RowTableOrganizaciones
							key={i.idOrganizacion}
							idOrganizacion={i.idOrganizacion}
							nombreOrganizacion={i.nombreOrganizacion}
							nombreLocalidad={i.nombreLocalidad}
							idLocalidad={i.idLocalidad}
							nombreDepartamento={i.nombreDepartamento}
							cueAnexo={i.cueAnexo}
							numeroTelefonoOrganizacion={i.numeroTelefonoOrganizacion}
							direccionOrganizacion={i.direccionOrganizacion}
							obtenerOrganizaciones={obtenerOrganizaciones}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TableOrganizaciones;
