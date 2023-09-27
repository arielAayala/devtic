import React, { useState, useEffect } from "react";

function DemandaFilter() {
	const [hide, setHide] = useState(false);
	const [loader, setLoader] = useState(false);
	const [organizaciones, setOrganizaciones] = useState([]);

	const handleHide = () => {
		setHide(!hide);
	};

	const listarOrganizaciones = () => {
		fetch("http://localhost/devtic/api/ListarOrganizaciones.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al listar las organizaciones");
				}
				return res.json();
			})
			.then((res) => {
				setOrganizaciones(res);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	useEffect(() => {
		listarOrganizaciones();
	}, []);
	return (
		<div className="flex flex-col justify-between">
			<button onClick={() => handleHide}>{hide ? "cerra" : "abrir"}</button>
			{hide ? (
				<form>
					<label
						htmlFor="filtros"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Filtros
					</label>
					<select
						id="tipos"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option>Seleccione un tipo</option>
						<option value="1">Invitación</option>
						<option value="2">Solicitud</option>
						<option value="3">Expediente</option>
					</select>
					<select
						id="organizacion"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value={0}>Seleccione una organizacion</option>
						{loader ? (
							organizaciones.map((i) => (
								<option
									key={i.idOrganizacion}
									value={i.idOrganizacion}
								>
									{i.nombreOrganizacion}
								</option>
							))
						) : (
							<option>Cargando organizaciones</option>
						)}
					</select>

					<select
						id="estados"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option>Seleccione un estado</option>
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
