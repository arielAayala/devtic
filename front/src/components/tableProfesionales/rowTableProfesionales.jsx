import React from "react";

import ButtonDeleteProfesional from "./buttonDeleteProfesional";
import ModalViewStats from "./modalViewStats";

function RowTableProfesionales(props) {
	const {
		obtenerProfesionales,
		idProfesional,
		nombrePersona,
		nombreEspecialidad,
		prioridadProfesional,
		estadistica,
		demandasEnCurso,
		demandasDemoradas,
		demandasIngresadas,
		demandasPendientes,
		demandasTerminadas,
		notasIngresadas,
	} = props;

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{nombrePersona}
			</th>
			{!estadistica ? (
				<>
					<td className="px-6 py-4">{nombreEspecialidad}</td>
					<td className="px-6 py-4">
						{prioridadProfesional == 1 ? "Administrador" : "Usuario normal"}
					</td>

					<td className="px-6 py-4 text-right">
						<ButtonDeleteProfesional
							idProfesional={idProfesional}
							obtenerProfesionales={obtenerProfesionales}
						/>
					</td>
				</>
			) : (
				<ModalViewStats
					demandasEnCurso={demandasEnCurso}
					demandasDemoradas={demandasDemoradas}
					demandasIngresadas={demandasIngresadas}
					demandasPendientes={demandasPendientes}
					demandasTerminadas={demandasTerminadas}
					notasIngresadas={notasIngresadas}
				/>
			)}
		</tr>
	);
}

export default RowTableProfesionales;
