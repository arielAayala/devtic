"use client";
import EstadoSpan from "@/components/estadoSpan/estadoSpan";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function PageAuditoria() {
	const [auditoria, setAuditoria] = useState([]);
	const [loader, setLoader] = useState(false);

	const obtenerAuditoria = () => {
		fetch("http://localhost/devtic/api/ObtenerAuditoria.php", {
			method: "GET",
			credentials: "include",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al cargar los profesionales", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				setAuditoria(res);
				setLoader(true);
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				console.error(errorMessage);
				profesionales([]);
			});
	};

	useEffect(() => {
		obtenerAuditoria();
	}, []);

	if (!loader) {
		return <h1>cargando auditoria...</h1>;
	}

	return (
		<div className="col-span-4 sm:col-span-9">
			<div className=" shadow rounded-lg p-6">
				<h2 className="text-xl font-bold mb-4">Historial de modificaciones</h2>
				<div className="">
					<div className="max-w-xl mx-auto p-8">
						<div className="flow-root">
							<ul className="-mb-8">
								{auditoria.map((i) => {
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

																<EstadoSpan nombreEstado={i.nombreEstado} />
															</div>
															<span className="whitespace-nowrap text-sm">
																{i.fechaAuditoria}
															</span>
														</div>
														<div className="mt-2 text-gray-700">
															<p>
																{i.nombrePersona} {i.nombreOperacion}
																<br />
																{i.idOperacion != 2 && i.idOperacion != 4 ? (
																	<>
																		{i.nombreEstadoViejo &&
																		i.nombreEstadoNuevo ? (
																			<>
																				{`- El estado '${i.nombreEstadoViejo}'
																				fue modificado a '${i.nombreEstadoNuevo}
																				'`}
																				<br />
																			</>
																		) : null}
																		{i.motivoDemandaViejo !=
																		i.motivoDemandaNuevo ? (
																			<>
																				{`- El Motivo '${i.motivoDemandaViejo}'
																				fue modificado a '${i.motivoDemandaNuevo}'`}
																				<br />
																			</>
																		) : null}
																		{i.relatoDemandaViejo !=
																		i.relatoDemandaNuevo ? (
																			<>
																				{`- El Relato '${i.relatoDemandaViejo}'
																				fue modificado a '${i.relatoDemandaNuevo}'`}
																				<br />
																			</>
																		) : null}
																		{i.almacenDemandaViejo !=
																		i.almacenDemandaNuevo ? (
																			<>
																				{`- El Almacen '${i.almacenDemandaViejo}'
																				fue modificado a '${i.almacenDemandaNuevo}'`}
																				<br />
																			</>
																		) : null}
																		{i.idOrganizacionViejo !=
																		i.idOrganizacionNuevo ? (
																			<>
																				{`- La Organización '${i.nombreOrganizacionViejo}' fue
																				modificado a '${i.nombreOrganizacionNuevo}'`}
																				<br />
																			</>
																		) : null}
																		{i.idTipoViejo != i.idTipoNuevo ? (
																			<>
																				{`- El Tipo de demanda '${i.nombreTipoViejo}' fue modificado a '${i.nombreTipoNuevo}'`}
																				<br />
																			</>
																		) : null}
																		{i.nombreProfesionalAfectado &&
																		i.idOperacion == 6 ? (
																			<>
																				{`- El profesional '${i.nombreProfesionalAfectado}' fue
																				agregado`}
																				<br />
																			</>
																		) : null}
																		{i.nombreProfesionalAfectado &&
																		i.idOperacion == 7 ? (
																			<>
																				{`- El profesional '${i.nombreProfesionalAfectado}' fue
																				eliminado`}
																				<br />
																			</>
																		) : null}
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
	);
}

export default PageAuditoria;
