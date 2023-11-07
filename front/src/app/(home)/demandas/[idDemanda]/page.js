"use client";
import Anexos from "@/components/anexos/anexos";
import DemandaModalDelete from "@/components/demandaModalDelete/demandaModalDelete";
import DemandaModalUpdate from "@/components/demandaModalUpdate/demandaModalUpdate";
import EstadoSpan from "@/components/estadoSpan/estadoSpan";
import GrupoModal from "@/components/grupoModal/grupoModal";
import Notas from "@/components/notas/notas";
import NotasModalForm from "@/components/notasModalForm/notasModalForm";
import PersonasInvolucradas from "@/components/personasInvolucradas/personasInvolucradas";
import SelectEstado from "@/components/selectEstado/selectEstado";
import { useAlertContext } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function PageIdDemanda() {
	const { user } = useAuthContext();
	const { crearAlert } = useAlertContext();
	const params = useParams();

	const [demanda, setDemanda] = useState(null);
	const [loader, setLoader] = useState(false);
	const [showEstado, setShowEstado] = useState(false);

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

	const handleChangeModalEstado = () => {
		setShowEstado(!showEstado);
	};

	useEffect(() => {
		const controller = new AbortController();
		fetch("http://localhost/devtic/api/ObtenerDemanda.php", {
			method: "POST",
			signal: controller.signal,
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(params),
		})
			.then(async (rest) => {
				if (!rest.ok) {
					throw new Error("Ocurrio un error al cargar la demanda", {
						cause: await rest.json(),
					});
				}

				return rest.json();
			})
			.then((rest) => {
				setDemanda(rest ?? {});
				setTimeout(() => setLoader(true), 100);
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				setDemanda({});
				setLoader(true);
				crearAlert({ error: errorMessage });
			});
		return () => {
			controller.abort();
		};
	}, [params.idDemanda]);

	console.log(demanda);

	if (!loader) {
		return (
			<div
				role="status"
				className="animate-pulse"
			>
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
			{Object.keys(demanda).length === 0 ? (
				<h2>No existe estaDemanda</h2>
			) : (
				<>
					<section>
						<div className=" flex justify-between">
							<GrupoModal
								idDemanda={params.idDemanda}
								grupo={demanda.grupo}
								obtenerDemanda={obtenerDemanda}
							/>
							<EstadoSpan nombreEstado={demanda.data.nombreEstado} />
						</div>
						<div className="py-8 px-4 mx-auto  lg:py-16">
							<h1 className="mb-6 text-4xl font-extrabold tracking-tight text-center leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
								{demanda.data.motivoDemanda}
							</h1>
							<p className="text-black text-left mb-1 text-base">
								Aqui se relata los hechos de la demanda:
							</p>
							<div className="p-2 border-2 shadow-lg rounded-lg m-6 bg-white">
								<p className="text-gray-400 text-left">
									{demanda.data.relatoDemanda}
								</p>
							</div>
							<h2 className="mb-6 text-4xl font-extrabold tracking-tight  leading-none text-gray-600 ">
								Detalles
							</h2>

							<p className="text-gray-500 dark:text-gray-400 mb-2">
								<span className="text-black">Tipo de demanda: </span>
								{demanda.data.nombreTipo}
							</p>

							<span className="text-black ">Organización: </span>
							<div className="p-2 border-2 shadow-lg rounded-lg mx-6 my-4 bg-white">
								<p className="text-gray-400 text-left">
									Nombre: {demanda.data.nombreOrganizacion}
									<br />
									CueAnexo: {demanda.data.cueAnexo}
									<br />
									Dirección: {demanda.data.direccionOrganizacion}
									<br />
									Departamento: {demanda.data.nombreDepartamento}
									<br />
									Localidad: {demanda.data.nombreLocalidad}
									<br />
									Tel: {demanda.data.numeroTelefonoOrganizacion}
								</p>
							</div>
						</div>
						{demanda.grupo.some((i) => i.idProfesional == user.idProfesional) ||
						user.prioridadProfesional == 1 ? (
							<div className="text-center">
								<div
									className="inline-flex rounded-md shadow-lg"
									role="group"
								>
									<NotasModalForm
										idDemanda={params.idDemanda}
										obtenerDemanda={obtenerDemanda}
									/>
									<DemandaModalUpdate
										obtenerDemanda={obtenerDemanda}
										motivoDemanda={demanda.data.motivoDemanda}
										relatoDemanda={demanda.data.relatoDemanda}
										idTipo={demanda.data.idTipo}
										idOrganizacion={demanda.data.idOrganizacion}
										idDemanda={demanda.data.idDemanda}
										almacenDemanda={demanda.data.almacenDemanda}
									/>
									<DemandaModalDelete params={params} />
								</div>
							</div>
						) : null}
					</section>
					<PersonasInvolucradas
						lstPersonasInvolucradas={demanda.personasInvolucradas}
					/>

					<Anexos lstAnexos={demanda.data.anexosDemanda} />

					<div className="flex justify-end mt-10 items-center">
						<div>
							<span className="text-black text-left mb-4 text-base">
								Cambiar de estado:
							</span>
							<SelectEstado
								idEstado={demanda.data.idEstado}
								idDemanda={params.idDemanda}
								obtenerDemanda={obtenerDemanda}
							/>
						</div>
					</div>
					<Notas lstNotas={demanda.notas} />
				</>
			)}
		</>
	);
}

export default PageIdDemanda;
