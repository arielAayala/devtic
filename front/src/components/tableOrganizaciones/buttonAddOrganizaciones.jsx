"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useEffect, useState } from "react";

function ButtonAddOrganizaciones(props) {
	const { crearAlert } = useAlertContext();
	const { obtenerOrganizaciones } = props;

	const [hide, setHide] = useState(true);
	const [loader, setLoader] = useState(false);
	const [localidades, setLocalidades] = useState([]);

	const [inputs, setInputs] = useState({
		nombreOrganizacion: null,
		idLocalidad: null,
		direccionOrganizacion: null,
		numeroTelefonoOrganizacion: null,
		cueAnexo: null,
	});

	const handleOnChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const obtenerLocalidades = () => {
		fetch("http://localhost/devtic/api/ListarLocalidades.php", {
			method: "GET",
			credentials: "include",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al listar las organizaciones", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				setLocalidades(res);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				setLocalidades([]);
				console.error({ error: errorMessage });
			});
	};

	const submitOrganizacion = (e) => {
		e.preventDefault();
		fetch("http://localhost/devtic/api/CrearOrganizacion.php", {
			body: JSON.stringify(inputs),
			credentials: "include",
			method: "POST",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un errror al crear el Organizacion", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				obtenerOrganizaciones();
				crearAlert(res);
				document.getElementById("formOrganizacion").reset();
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				crearAlert({ error: errorMessage });
			});
	};

	useEffect(() => {
		obtenerLocalidades();
	}, []);

	return (
		<>
			<button
				className="block ml-5 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
				onClick={() => setHide(!hide)}
			>
				<svg className="ml-3.5 w-6 h-6 text-white dark:text-white item-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
					<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15V9m4 6V9m4 6V9m4 6V9M2 16h16M1 19h18M2 7v1h16V7l-8-6-8 6Z"/>
				</svg>
				<p className="text-center mt-2"> Agregar</p>
			</button>
			{hide ? null : (
				<div className="fixed top-0 left-0 right-0 z-50 bg-gray-700 bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full">
					<div className="relative w-full max-w-md max-h-full m-auto">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
							<button
								type="button"
								className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								onClick={() => setHide(true)}
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
							<div className="px-6 py-6 lg:px-8">
								<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
									Registrar Organizacion
								</h3>

								<form
									onSubmit={submitOrganizacion}
									id="formOrganizacion"
								>
									<div className="relative z-0 w-full mb-6 group">
										<input
											name="nombreOrganizacion"
											id="nombreOrganizacion"
											autoComplete="off"
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											placeholder=" "
											onChange={handleOnChange}
											required
										/>
										<label
											htmlFor="nombreOrganizacion"
											className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
										>
											Nombre de la Organización
										</label>
									</div>
									<div className="relative z-0 w-full mb-6 group">
										<input
											name="cueAnexo"
											id="cueAnexo"
											autoComplete="off"
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											placeholder=" "
											onChange={handleOnChange}
										/>
										<label
											htmlFor="cueAnexo"
											className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
										>
											cueAnexo
										</label>
									</div>

									<div className="relative z-0 w-full mb-6 group">
										<label
											htmlFor="idLocalidad"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Localidad de la Organización
										</label>
										<div className="mt-2">
											<select
												onChange={handleOnChange}
												name="idLocalidad"
												className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											>
												<option>Seleccione una opción</option>
												{loader ? (
													localidades.map((i) => (
														<option
															key={i.idLocalidad}
															value={i.idLocalidad}
														>
															{i.nombreLocalidad}
														</option>
													))
												) : (
													<option>Cargando localidades</option>
												)}
											</select>
										</div>
									</div>
									<div className="relative z-0 w-full mb-6 group">
										<input
											name="direccionOrganizacion"
											id="direccionOrganizacion"
											autoComplete="off"
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											placeholder=" "
											onChange={handleOnChange}
											required
										/>
										<label
											htmlFor="direccionOrganizacion"
											className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
										>
											Dirrecion de la Organización
										</label>
									</div>
									<div className="relative z-0 w-full mb-6 group">
										<input
											name="numeroTelefonoOrganizacion"
											id="numeroTelefonoOrganizacion"
											autoComplete="off"
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											placeholder=" "
											onChange={handleOnChange}
											required
										/>
										<label
											htmlFor="numeroTelefonoOrganizacion"
											className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
										>
											Teléfono de la Organización
										</label>
									</div>
									<button
										type="submit"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Agregar
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ButtonAddOrganizaciones;
