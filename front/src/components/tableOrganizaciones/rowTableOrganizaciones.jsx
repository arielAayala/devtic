import React from "react";
import ButtonDeleteOrganizaciones from "./buttonDeleteOrganizaciones";
import ButtonUpdateOrganizaciones from "./buttonUpdateOrganizaciones";

function RowTableOrganizaciones(props) {
	const {
		obtenerOrganizaciones,
		idOrganizacion,
		nombreOrganizacion,
		direccionOrganizacion,
		numeroTelefonoOrganizacion,
		nombreLocalidad,
		nombreDepartamento,
		cueAnexo,
	} = props;

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
			>
				{nombreOrganizacion}
			</th>
			<td className="px-6 py-4">{cueAnexo}</td>
			<td className="px-6 py-4">{nombreDepartamento}</td>
			<td className="px-6 py-4">{nombreLocalidad}</td>
			<td className="px-6 py-4">{direccionOrganizacion}</td>
			<td className="px-6 py-4">{numeroTelefonoOrganizacion ?? "-"}</td>
			<td className="px-6 py-4">
				<ButtonUpdateOrganizaciones
					idOrganizacion={idOrganizacion}
					obtenerOrganizaciones={obtenerOrganizaciones}
				/>
			</td>
			<td className="px-6 py-4">
				<ButtonDeleteOrganizaciones
					idOrganizacion={idOrganizacion}
					obtenerOrganizaciones={obtenerOrganizaciones}
				/>
			</td>
		</tr>
	);
}

export default RowTableOrganizaciones;
