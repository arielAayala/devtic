import React from "react";

import ButtonDeleteProfesional from "./buttonDeleteProfesional";

function RowTableProfesionales(props) {
	const {
		obtenerProfesionales,
		idProfesional,
		nombrePersona,
		nombreEspecialidad,
		prioridadProfesional,
	} = props;

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{nombrePersona}
			</th>
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
		</tr>
	);
}

export default RowTableProfesionales;
