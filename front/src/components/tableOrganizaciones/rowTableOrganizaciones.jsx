import React from "react";
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
		idLocalidad,
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
					nombreOrganizacion={nombreOrganizacion}
					direccionOrganizacion={direccionOrganizacion}
					numeroTelefonoOrganizacion={numeroTelefonoOrganizacion}
					nombreLocalidad={nombreLocalidad}
					cueAnexo={cueAnexo}
					idLocalidad={idLocalidad}
				/>
			</td>
		</tr>
	);
}

export default RowTableOrganizaciones;
