import React, { useState } from "react";

function DemandaFilter() {
	const [hide, setHide] = useState(true);

	const handleHide = () => {
		setHide(!hide);
	};

	return (
		<div className="flex flex-col justify-between">
			<button></button>
			{hide ? (
				<form>
					<label
						for="filtros"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Filtros
					</label>
					<select
						id="tipos"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option selected>Seleccione un tipo</option>
						<option value="1">Invitación</option>
						<option value="2">Solicitud</option>
						<option value="3">Expediente</option>
					</select>
					<select
						id="organizacion"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option selected>Seleccione una organizacion</option>
						<option value="1">Instituto Privado General San Martin</option>
					</select>

					<select
						id="estados"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option selected>Seleccione un estado</option>
						<option value="1">Pendiente</option>
						<option value="2">En curso</option>
						<option value="3">Terminado</option>
						<option value="4">Demorado</option>
					</select>
				</form>
			) : null}
		</div>
	);
}

export default DemandaFilter;
