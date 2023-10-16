"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";

function DemandaModalUpdate(props) {
	const {
		obtenerDemanda,
		idDemanda,
		relatoDemanda,
		motivoDemanda,
		idTipo,
		idOrganizacion,
		almacenDemanda,
	} = props;

	//Modals
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModalOpen = () => {
		setIsModalOpen(() => !isModalOpen);
	};

	const { crearAlert } = useAlertContext();
	const [organizaciones, setOrganizaciones] = useState([]);
	const [loader, setLoader] = useState(false);
	const [input, setInput] = useState({
		idDemanda: idDemanda,
		relatoDemanda: relatoDemanda,
		motivoDemanda: motivoDemanda,
		idTipo: idTipo,
		idOrganizacion: idOrganizacion,
		almacenDemanda: almacenDemanda,
	});

	const textbox = useRef(null);

	const adjustHeight = () => {
		textbox.current.style.height = "inherit";
		textbox.current.style.height = `${textbox.current.scrollHeight}px`;
	};

	useLayoutEffect(adjustHeight, []);

	const handleKeyDown = (e) => {
		adjustHeight();
		handleChange(e);
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

	const handleSubmit = () => {
		fetch("http://localhost/devtic/api/ActualizarDemanda.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(input),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al actualizar la demanda");
				}

				return res.json();
			})
			.then((res) => {
				crearAlert(res);
				obtenerDemanda();
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		listarOrganizaciones();
	}, []);

	return (
		<>
			<button
				type="button"
				onClick={handleModalOpen}
				className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
			>
				<svg
					className="w-3 h-3 mr-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
					></path>
				</svg>
				Cambiar
			</button>

			<div
				className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center z-50 ${
					isModalOpen ? "" : "hidden"
				}`}
			>
				<div className="bg-white dark:bg-gray-800  p-4 px-10  rounded-lg z-10 w-screen flex flex-col justify-start">
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white w-max"
						data-modal-toggle="readProductModal"
						onClick={handleModalOpen}
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
						<span className="sr-only">Cerrar Demanda</span>
					</button>
					<div
						onSubmit={handleSubmit}
						className="flex flex-col justify-start px-8"
					>
						<h3 className="mb-4">Actualizar Demanda</h3>
						{/* INGRESAR UN TITULO PARA LA DEMANDA */}
						<div className="relative z-0 w-full mb-6 group">
							<input
								onChange={handleChange}
								type="text"
								name="motivoDemanda"
								id="motivoDemanda"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required=""
								defaultValue={motivoDemanda}
							/>
							<label
								htmlFor="motivoDemanda"
								className="peer-focus:font-medium flex absolute  text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Motivo
							</label>
						</div>

						{/* ESCRIBIR EL MOTIVO DE LA DEMANDA */}
						<div className="relative z-0 w-full mb-6 group">
							<textarea
								onChange={handleKeyDown}
								ref={textbox}
								type="text"
								name="relatoDemanda"
								id="relatoDemanda"
								className="block  py-4 resize-none h-min overflow-y-hidden px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								required=""
								defaultValue={relatoDemanda}
							/>
							<label
								htmlFor="relatoDemanda"
								className="peer-focus:font-medium flex absolute  text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Relato
							</label>
						</div>
						{/* BUSCAR INSTITUCIONES */}
						<div className="relative z-0 w-full mb-6 group">
							{loader ? (
								<select
									onChange={handleChange}
									type="search"
									name="idOrganizacion"
									id="idOrganizacion"
									className="block  px-0 w-full pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required=""
									value={idOrganizacion}
								>
									<option
										className=" text-xs"
										value={0}
									>
										Seleccione una opcion
									</option>
									{organizaciones.map((i) => {
										return (
											<option
												className=" text-xs"
												key={i.idOrganizacion}
												value={i.idOrganizacion}
											>
												{i.nombreOrganizacion}
											</option>
										);
									})}
								</select>
							) : (
								<select
									onChange={handleChange}
									type="search"
									className="block  px-0 w-full pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									required=""
								>
									<option className=" text-xs">Cargando organizaciones</option>
								</select>
							)}

							<label
								htmlFor="idOrganizacion"
								className="peer-focus:font-medium flex absolute  text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Organización
							</label>
						</div>
						{/* Tipo de demanda */}
						<div className="relative z-0 w-full mb-6 group">
							<select
								onChange={handleChange}
								type="search"
								name="idTipo"
								id="idTipo"
								className="block  px-0 w-full pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required=""
								defaultValue={parseInt(idTipo)}
							>
								<option className=" text-xs">Seleccione una opcion</option>
								<option
									className=" text-xs"
									value={1}
								>
									Invitacion
								</option>
								<option
									className=" text-xs"
									value={2}
								>
									Solicitud
								</option>
								<option
									className=" text-xs"
									value={3}
								>
									Expediente
								</option>
							</select>
							<label
								htmlFor="idTipo"
								className="peer-focus:font-medium flex absolute  text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Tipo
							</label>
						</div>
						{/* INGRESAR UN almacen PARA LA DEMANDA */}
						<div className="relative z-0 w-full mb-6 group">
							<input
								onChange={handleChange}
								type="text"
								name="almacenDemanda"
								id="almacenDemanda"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required=""
								defaultValue={almacenDemanda ?? ""}
							/>
							<label
								htmlFor="almacenDemanda"
								className="peer-focus:font-medium flex absolute  text-gray-500 dark:text-gray-400 duration-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Demanda almacenada en
							</label>
						</div>

						<div className="p-6 text-center">
							<button
								onClick={handleSubmit}
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Actualizar
							</button>
							<button
								onClick={handleModalOpen}
								type="button"
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DemandaModalUpdate;
