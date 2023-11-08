"use client";
import { useAlertContext } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import EstadoSpan from "@/components/estadoSpan/estadoSpan";
function Perfil() {
	const { user } = useAuthContext();
	const { crearAlert } = useAlertContext();
	const [profesional, setProfesional] = useState([]);
	const [loader, setLoader] = useState(false);
	const params = useParams();

	const obtenerPerfil = () => {
		fetch("http://localhost/devtic/api/ObtenerPerfil.php", {
			body: JSON.stringify(params),
			credentials: "include",
			method: "POST",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Error al obtener el perfil del profesional", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				console.log(res);
				setProfesional(res);
				setLoader(true);
			})
			.catch((e) => {
				const errorMessage = e.cause?.error || e.error;
				crearAlert({ error: errorMessage });
			});
	};

	useEffect(() => {
		obtenerPerfil();
	}, []);

	if (!loader) {
		return <h1>Cargando...</h1>;
	}

	return (
		<>
			<div className="bg-gray-100">
				<div className="container mx-auto py-8">
					<div className="grid grid-cols-4  gap-6 px-4">
						<div className="col-span-4 sm:col-span-12">
							<div className="bg-white shadow rounded-lg p-6">
								<div className="flex flex-col items-center">
									<img
										src={profesional.datosProfesional.fotoProfesional}
										className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
									></img>
									<h1 className="text-xl font-bold">
										{profesional.datosProfesional.nombrePersona
											.toLowerCase()
											.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
												return letter.toUpperCase();
											})}
									</h1>
									<p className="text-gray-600">
										{profesional.datosProfesional.nombreEspecialidad
											.toLowerCase()
											.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
												return letter.toUpperCase();
											})}
									</p>
								</div>
								<hr className="my-6 border-t border-gray-300" />
								<div className="flex flex-col"></div>
							</div>
						</div>
						<div className="col-span-4 sm:col-span-12">
							<div className="bg-white shadow rounded-lg p-6">
								<h2 className="text-xl font-bold mb-4">
									Historial de movimientos
								</h2>
								<div className="bg-white">
									<div className="max-w-xl mx-auto p-8">
										<div className="flow-root">
											<ul className="-mb-8">
												{profesional.movimientoProfesional.map((i) => {
													return (
														<li key={i.idAuditoriaDemanda}>
															<div className="relative pb-8">
																<span
																	className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
																	aria-hidden="true"
																></span>
																<div className="relative flex items-start space-x-3">
																	<div>
																		<div className="relative px-1">
																			<div className="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
																				<svg
																					className="text-white h-5 w-5"
																					xmlns="http://www.w3.org/2000/svg"
																					fill="none"
																					viewBox="0 0 24 24"
																					stroke="currentColor"
																				>
																					<path
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						strokeWidth="2"
																						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
																					/>
																				</svg>
																			</div>
																		</div>
																	</div>
																	<div className="min-w-0 flex-1 py-0">
																		<div className="text-md text-gray-500">
																			<div>
																				<Link
																					href={`/demandas/${i.idDemanda}`}
																					className="font-medium text-gray-900 mr-2"
																				>
																					{i.motivoDemanda} [{i.idDemanda}]
																				</Link>

																				<EstadoSpan
																					nombreEstado={i.nombreEstado}
																				/>
																			</div>
																			<span className="whitespace-nowrap text-sm">
																				{i.fechaAuditoria}
																			</span>
																		</div>
																		<div className="mt-2 text-gray-700">
																			<p>
																				{i.nombrePersona} {i.nombreOperacion}
																				<br />
																				{i.idOperacion != 2 &&
																				i.idOperacion != 4 ? (
																					<>
																						{i.nombreEstadoViejo &&
																						i.nombreEstadoNuevo
																							? `- El estado '${i.nombreEstadoViejo}' fue modificado a '${i.nombreEstadoNuevo}'`
																							: null}
																						{i.motivoDemandaViejo !=
																						i.motivoDemandaNuevo
																							? `- El Motivo '${i.motivoDemandaViejo}' fue modificado a '${i.motivoDemandaNuevo}'`
																							: null}
																						{i.relatoDemandaViejo !=
																						i.relatoDemandaNuevo
																							? `- El Relato '${i.relatoDemandaViejo}' fue modificado a '${i.relatoDemandaNuevo}'`
																							: null}
																						{i.almacenDemandaViejo !=
																						i.almacenDemandaNuevo
																							? `- El Almacen '${i.almacenDemandaViejo}' fue modificado a '${i.almacenDemandaNuevo}'`
																							: null}
																						{i.idOrganizacionViejo !=
																						i.idOrganizacionNuevo
																							? `- La Organización '${i.nombreOrganizacionViejo}' fue modificado a '${i.nombreOrganizacionNuevo}'`
																							: null}
																						{i.idTipoViejo != i.idTipoNuevo
																							? `- El Tipo de demanda '${i.nombreTipoViejo}' fue modificado a '${i.nombreTipoNuevo}'`
																							: null}
																					</>
																				) : null}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Perfil;
