import React, { useState, useEffect } from "react";
import Link from "next/link";

function DemandaFilter(props) {
	const {
		obtenerDemandasConFiltros,
		setInputs,
		inputs,
		obtenerDemandas,
		flags,
	} = props;

	const [hide, setHide] = useState(false);
	const [loader, setLoader] = useState(false);
	const [organizaciones, setOrganizaciones] = useState([]);

	const handleChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleHide = () => {
		setHide((prev) => {
			if (prev && flags == 1) {
				obtenerDemandas(1);
				setInputs({
					idEstado: 0,
					idTipo: 0,
					idOrganizacion: 0,
					fechaCierreDemanda: null,
					fechaIngresoDemanda: null,
				});
			}
			return !prev;
		});
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
				console.error(error.message);
			});
	};

	useEffect(() => {
		listarOrganizaciones();
	}, []);

	return (
		<div className=" flex  flex-col m-auto mb-10 border-b border-gray-200 dark:border-gray-700">
			<ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 justify-between">
					<li className="mr-1">
						<Link
							href="/crearDemanda"
							className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-black group  cursor-pointer"
						>
							<svg
								className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 20"
							>
								<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
							</svg>
							Agregar Demanda
						</Link>
					</li>
					<li className="mr-1">
					<a
						className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-black group  cursor-pointer"
						onClick={handleHide}
					>
						<svg
							class="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-700 "
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
							/>
						</svg>
						{hide ? "Ocultar Filtros" : "Ver Filtros"}
					</a>
				</li>
			</ul>
			<div
				className={
					"flex flex-row justify-around flex-wrap items-center " +
					(hide ? "" : "hidden")
				}
			>
				<div className="m-2">
					<label
						htmlFor="tipos"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Tipos
					</label>
					<select
						name="idTipo"
						onChange={handleChange}
						id="tipos"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value={0}>Sin selección</option>
						<option value="1">Invitación</option>
						<option value="2">Solicitud</option>
						<option value="3">Expediente</option>
					</select>
				</div>
				<div className="m-2">
					<label
						htmlFor="organizacion"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Organización
					</label>
					<select
						name="idOrganizacion"
						onChange={handleChange}
						id="organizacion"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value={0}>Sin selección</option>
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
				</div>
				<div className="m-2">
					<label
						htmlFor="estados"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Estados
					</label>
					<select
						name="idEstado"
						onChange={handleChange}
						id="estados"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value={0}>Sin selección</option>
						<option value="1">Pendiente</option>
						<option value="2">En curso</option>
						<option value="3">Terminado</option>
						<option value="4">Demorado</option>
					</select>
				</div>
				<div className="m-2">
					<label
						htmlFor="fechaIngresoDemanda"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Fecha Ingreso
					</label>
					<input
						name="fechaIngresoDemanda"
						onChange={handleChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="date"
					></input>
				</div>
				<div className="m-2">
					<label
						htmlFor="fechaCierreDemanda"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Fecha Cierre
					</label>
					<input
						name="fechaCierreDemanda"
						onChange={handleChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="date"
					></input>
				</div>
				<button
					onClick={() => {
						obtenerDemandasConFiltros(inputs, 1);
					}}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Aplicar
				</button>
			</div>
		</div>
	);
}

export default DemandaFilter;
