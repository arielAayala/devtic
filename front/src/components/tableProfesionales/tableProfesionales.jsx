"use client";

import React, { useState } from "react";
import RowTableProfesionales from "./rowTableProfesionales";
import { useEffect } from "react";
import ButtonAddProfesional from "./buttonAddProfesional";

function TableProfesionales(props) {
	const { obtenerProfesionales, profesionales, estadistica } = props;

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			{!estadistica ? (
				<ButtonAddProfesional obtenerProfesionales={obtenerProfesionales} />
			) : null}
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
					Profesionales
					<p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
						{!estadistica
							? "Listado donde se visualiza los profesionales adheridos al sistema."
							: "Listado de estadisticas de los profesionales."}
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
						{!estadistica ? (
							<>
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
							</>
						) : (
							<th
								scope="col"
								className="px-6 py-3"
							>
								<span className="sr-only">Estadisticas</span>
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{profesionales.map((i) => (
						<RowTableProfesionales
							key={i.idProfesional}
							obtenerProfesionales={obtenerProfesionales}
							idProfesional={i.idProfesional}
							nombrePersona={i.nombrePersona}
							nombreEspecialidad={i.nombreEspecialidad}
							prioridadProfesional={i.prioridadProfesional}
							estadistica={estadistica}
							demandasEnCurso={i.demandasEnCurso}
							demandasDemoradas={i.demandasDemoradas}
							demandasIngresadas={i.demandasIngresadas}
							demandasPendientes={i.demandasPendientes}
							demandasTerminadas={i.demandasTerminadas}
							notasIngresadas={i.notasIngresadas}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TableProfesionales;
