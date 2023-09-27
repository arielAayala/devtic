"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useState } from "react";

function ButtonAddProfesional(props) {
	const { crearAlert } = useAlertContext();
	const { obtenerProfesionales } = props;

	const [hide, setHide] = useState(true);
	const [inputs, setInputs] = useState({
		nombrePersona: null,
		dniPersona: null,
		correoProfesional: null,
		especialidadProfesional: null,
		prioridadProfesional: null,
	});

	const handleOnChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const submitProfesional = (e) => {
		e.preventDefault();
		fetch("http://localhost/devtic/api/CrearProfesional.php", {
			body: JSON.stringify(inputs),
			credentials: "include",
			method: "POST",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un errror al crear el profesional");
				}
				return res.json();
			})
			.then((res) => {
				obtenerProfesionales();
				crearAlert(res);
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	return (
		<>
			<button
				className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
				onClick={() => setHide(!hide)}
			>
				Agregar Profesional
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
									Registrar profesional
								</h3>

								<form onSubmit={submitProfesional}>
									<div className="relative z-0 w-full mb-6 group">
										<input
											name="nombrePersona"
											id="nombrePersona"
											autoComplete="off"
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											placeholder=" "
											onChange={handleOnChange}
											required
										/>
										<label
											htmlFor="nombrePersona"
											className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
										>
											Nombre y Apellido
										</label>
									</div>
									<div className="relative z-0 w-full mb-6 group">
										<input
											onChange={handleOnChange}
											type="numberic"
											name="dniPersona"
											autoComplete="off"
											id="dniPersona"
											className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
											placeholder=" "
											required
										/>
										<label
											htmlFor="dniPersona"
											className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
										>
											Documento
										</label>
									</div>
									<div className="grid md:grid-cols-2 md:gap-6">
										<div className="relative z-0 w-full mb-6 group col-span-2">
											<input
												type="email"
												onChange={handleOnChange}
												name="correoProfesional"
												id="correoProfesional"
												className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
												placeholder=""
												autoComplete="off"
												required
											/>
											<label
												htmlFor="correoProfesional"
												className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
											>
												Correo
											</label>
										</div>
									</div>
									<div className="grid md:grid-cols-2 md:gap-6">
										<div className="relative z-0 w-full mb-6 group col-span-2">
											<label
												htmlFor="especialidadProfesional"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Selecciona una Especialidad
											</label>
											<select
												onChange={handleOnChange}
												id="especialidadProfesional"
												name="especialidadProfesional"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option>Sin selección</option>
												<option value={1}>Abogado/a</option>
												<option value={2}>Psicopedagogo/a</option>
											</select>
										</div>
									</div>
									<div className="grid md:grid-cols-2 md:gap-6">
										<div className="relative z-0 w-full mb-6 group col-span-2">
											<label
												htmlFor="prioridadProfesional"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Selecciona la prioridad
											</label>
											<select
												onChange={handleOnChange}
												id="prioridadProfesional"
												name="prioridadProfesional"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option>Sin selección</option>
												<option value={0}>Usuario normal</option>
												<option value={1}>Usuario administrador</option>
											</select>
										</div>
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

export default ButtonAddProfesional;
