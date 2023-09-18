"use client";
import DemandaModalUpdate from "@/components/demandaModalUpdate/demandaModalUpdate";
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
				return rest.json();
			})
			.then((rest) => {
				setDemanda(rest ?? {});
				setTimeout(() => setLoader(true), 100);
			});
	};

	useEffect(() => {
		obtenerDemanda();
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
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
				return rest.json();
			})
			.then((rest) => {
				crearAlert(rest);
				router.push("/demandas");
			})
			.catch((error) => {
				crearAlert(error);
				console.log(error);
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
						<div>
							Grupo:
							{demanda.grupo.map((i) => (
								<div key={i.idProfesional}>
									{i.nombrePersona} - {i.nombreEspecialidad}
								</div>
							))}
						</div>
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
						{demanda.grupo.some((i) => i.idProfesional == user.idProfesional) ||
						user.prioridadProfesional == 1 ? (
							<div className="flex items-center justify-end space-x-3 sm:space-x-4">
								<button
									type="button"
									onClick={openModal}
									className="text-white inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								>
									<svg
										aria-hidden="true"
										className="mr-1 -ml-1 w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
										<path
											fillRule="evenodd"
											d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
											clipRule="evenodd"
										></path>
									</svg>
									Editar
								</button>
								<button
									type="button"
									onClick={handleBorrarDemanda}
									className="text-white inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								>
									<svg
										aria-hidden="true"
										className="mr-1 -ml-1 w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
										<path
											fillRule="evenodd"
											d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
											clipRule="evenodd"
										></path>
									</svg>
									Borrar
								</button>
							</div>
						) : null}
					</div>
					{isModalOpen && (
						<div className=" fixed inset-0 flex items-center justify-center z-50">
							<div className="absolute inset-0 bg-gray-800 opacity-60"></div>
							<div className="bg-white dark:bg-gray-800  p-4 px-10  rounded-lg z-10">
								<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="readProductModal"
									onClick={closeModal}
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
				</div>
			)}
		</>
	);
}

export default PageIdDemanda;
