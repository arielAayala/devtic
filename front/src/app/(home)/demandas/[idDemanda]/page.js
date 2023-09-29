"use client";
import DemandaModalUpdate from "@/components/demandaModalUpdate/demandaModalUpdate";
import SelectEstado from "@/components/selectEstado/selectEstado";
import SelectProfesional from "@/components/selectProfesional/selectProfesional";
import { useAlertContext } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PageIdDemanda() {
	const { user } = useAuthContext();
	const { crearAlert } = useAlertContext();
	const params = useParams();
	const router = useRouter();
	const [demanda, setDemanda] = useState({});
	const [loader, setLoader] = useState(false);

	const obtenerDemanda = () => {
		fetch("http://localhost/devtic/api/ObtenerDemanda.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(params),
		})
			.then((rest) => {
				if (!rest.ok) {
					throw new Error("Ocurrio un error al cargar la demanda");
				}

				return rest.json();
			})
			.then((rest) => {
				setDemanda(rest ?? {});
				setTimeout(() => setLoader(true), 100);
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	useEffect(() => {
		obtenerDemanda();
	}, []);
	//Modals
	const [isModalDemandaOpen, setIsModalOpenDemanda] = useState(false);
	const openModalDemanda = () => {
		setIsModalOpenDemanda(true);
	};
	const closeModalDemanda = () => {
		setIsModalOpenDemanda(false);
	};
	
	const [isModalGrupoOpen, setIsModalOpenGrupo] = useState(false);
	const openModalGrupo = () => {
		setIsModalOpenGrupo(true);
	};
	const closeModalGrupo = () => {
		setIsModalOpenGrupo(false);
	};

	const handleBorrarDemanda = () => {
		fetch("http://localhost/devtic/api/EliminarDemanda.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(params),
		})
			.then((rest) => {
				if (!rest.ok) {
					throw new Error("Ocurrio un error al eliminar la demanda");
				}
				return rest.json();
			})
			.then((rest) => {
				crearAlert(rest);
				router.push("/demandas");
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	if (!loader) {
		return (
			<div
				role="status"
				className="animate-pulse"
			>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>

				<div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
				<div className="flex items-center justify-center mt-4">
					<svg
						className="w-8 h-8 text-gray-200 dark:text-gray-700 mr-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
					</svg>
					<div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
					<div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
				<span className="sr-only">Loading...</span>
			</div>
		);
	}

	return (
		<>
			{demanda == {} ? (
				<h2>No existe estaDemanda</h2>
			) : (
				<div>
					<section className="bg-white dark:bg-gray-900">
						<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
							<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
								{demanda.data.motivoDemanda}
							</h1>
							<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
								{demanda.data.nombreOrganizacion}
							</p>

							<p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
								{demanda.data.nombreTipo}
							</p>
							<p className="text-gray-500 dark:text-gray-400">
								{demanda.data.relatoDemanda}
							</p>
						</div>
						{demanda.grupo.some((i) => i.idProfesional == user.idProfesional) ||
						user.prioridadProfesional == 1 ? (
							<div className="text-center">
							<div className="inline-flex rounded-md shadow-sm" role="group">
								<button type="button" onClick={openModalGrupo} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
									<svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z">
										</path>
									</svg>
									Grupo
								</button>
							<button type="button" onClick={openModalDemanda} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
								<svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"></path>
								</svg>
								Cambiar
							</button>
							<button type="button" onClick={handleBorrarDemanda} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
								<svg className="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
								<path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
								</svg>
								Borrar
							</button>
							</div>
							</div>
						) : null}
						<div>
							Personas Involucradas:
							{demanda.personasInvolucradas.map((i) => (
								<div key={i.idPersonaInvolucrada}>{i.nombrePersona}</div>
							))}
						</div>
					</section>
					<div className="flex items-center space-x-4">
						<img
							className="w-12 h-12 rounded-full"
							src={demanda.data.fotoProfesional}
							alt="Large avatar"
						/>
						<div className="font-medium flex-1 dark:text-white">
							<div>
								{demanda.data.nombrePersona
									.toLowerCase()
									.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
										return letter.toUpperCase();
									})}
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								{demanda.data.nombreEspecialidad
									.toLowerCase()
									.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
										return letter.toUpperCase();
									})}
							</div>
						</div>
						<div className="flex items-center justify-end space-x-3 sm:space-x-4">
								<SelectProfesional
									idDemanda={params.idDemanda}
									grupo={demanda.grupo}
									obtenerDemanda={obtenerDemanda}
								/>
								<SelectEstado
									idDemanda={params.idDemanda}
									obtenerDemanda={obtenerDemanda}
								/>
							</div>
						<div>
						</div>
					</div>
					{isModalDemandaOpen && (
						<div className=" fixed inset-0 flex items-center justify-center z-50">
							<div className="absolute inset-0 bg-gray-800 opacity-60"></div>
							<div className="bg-white dark:bg-gray-800  p-4 px-10  rounded-lg z-10 w-screen">
								<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="readProductModal"
									onClick={closeModalDemanda}
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
								<DemandaModalUpdate
									obtenerDemanda={obtenerDemanda}
									motivoDemanda={demanda.data.motivoDemanda}
									relatoDemanda={demanda.data.relatoDemanda}
									idTipo={demanda.data.idTipo}
									idOrganizacion={demanda.data.idOrganizacion}
									idDemanda={demanda.data.idDemanda}
									almacenDemanda={demanda.data.almacenDemanda}
								></DemandaModalUpdate>
							</div>
						</div>
					)}
					{isModalGrupoOpen && (
					<div>
						{demanda.grupo.map((i) => (
						<div className=" fixed inset-0 flex items-center justify-center z-50">
							<div className="absolute inset-0 bg-gray-800 opacity-60"></div>
							<div className="bg-white dark:bg-gray-800  p-4 px-10  rounded-lg z-10 w-screen">
							<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="readProductModal"
									onClick={closeModalGrupo}
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
								<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
									
									<div className="flex justify-end px-4 pt-4">
										<button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
											<span className="sr-only">Open dropdown</span>
											<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
												<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
											</svg>
										</button>
										<div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
											<ul className="py-2" aria-labelledby="dropdownButton">
											<li>
												<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delegar responsabilidad</a>
											</li>
											<li>
												<a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Eliminar</a>
											</li>
											</ul>
										</div>
									</div>
									<div key={i?.idProfesional} className="flex flex-col items-center pb-10">
										<img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={i.fotoProfesional} alt="profesionalFoto"/>
										<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{i.nombrePersona}</h5>
										<span className="text-sm text-gray-500 dark:text-gray-400">{i.nombreEspecialidad}</span>
										<div class="flex mt-4 space-x-3 md:mt-6">
											<a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver Perfil</a>
											<a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Mensaje</a>
										</div>
									</div>
								</div>
							</div>
							</div>
							))}
					</div>
					)}
				</div>
			)}
		</>
	);
}

export default PageIdDemanda;
