"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useState } from "react";
import { useEffect } from "react";

function SelectProfesional(props) {
	const { idDemanda, grupo, obtenerDemanda } = props;

	const { crearAlert } = useAlertContext();
	const [profesionales, setProfesionales] = useState([]);
	const [loader, setLoader] = useState(false);
	const [profesional, setProfesional] = useState({
		idDemanda: idDemanda,
		idProfesional: null,
	});

	const listarProfesional = () => {
		fetch("http://localhost/devtic/api/ListarProfesionales.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al listar los profesionales");
				}
				return res.json();
			})
			.then((res) => {
				setProfesionales(res ?? []);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	const handleChange = (e) => {
		setProfesional({ ...profesional, idProfesional: e.target.value });
	};

	const handleSubmitProfesional = (e) => {
		e.preventDefault();
		fetch("http://localhost/devtic/api/AgregarProfesionalAlGrupo.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(profesional),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						"Ocurrio un error al agregar al profesional al grupo de trabajo"
					);
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
			})
			.then(() => {
				obtenerDemanda();
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	useEffect(() => {
		listarProfesional();
	}, []);

	return (
		<>
			{/* <section class="flex items-center  bg-gray-50 dark:bg-gray-900">
				<div class="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
					<div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
						<div class="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
							<div>
								<h5 class="mr-3 font-semibold dark:text-white">
									Flowbite Users
								</h5>
								<p class="text-gray-500 dark:text-gray-400">
									Manage all your existing users or add a new one
								</p>
							</div>
							<button
								type="button"
								class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-3.5 w-3.5 mr-2 -ml-1"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
								</svg>
								Add new user
							</button>
						</div>
					</div>
				</div>
			</section>
 */}
			<form onSubmit={handleSubmitProfesional}>
				<select
					id="idProfesional"
					onChange={handleChange}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8px p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option>Seleccione un profesionales</option>
					{loader ? (
						profesionales.map((i) => {
							if (grupo.every((g) => i.idProfesional != g.idProfesional)) {
								return (
									<option
										key={i.idProfesional}
										value={i.idProfesional}
									>
										{i.nombrePersona}
									</option>
								);
							} else {
								return null;
							}
						})
					) : (
						<option>Cargando profesionales</option>
					)}
				</select>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Agregar Profesional al grupo
				</button>
			</form>
		</>
	);
}

export default SelectProfesional;
