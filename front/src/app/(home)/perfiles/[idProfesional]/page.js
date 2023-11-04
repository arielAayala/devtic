"use client";
import { useAuthContext } from "@/context/authContext";
import React from "react";

function Perfil() {
	const { user } = useAuthContext();

	return (
		<>
			<div className="bg-gray-100">
				<div className="container mx-auto py-8">
					<div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
						<div className="col-span-4 sm:col-span-3">
							<div className="bg-white shadow rounded-lg p-6">
								<div className="flex flex-col items-center">
									<img
										src={user?.fotoProfesional}
										className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
									></img>
									<h1 className="text-xl font-bold">
										{user?.nombrePersona
											.toLowerCase()
											.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
												return letter.toUpperCase();
											})}
									</h1>
									<p className="text-gray-600">
										{user?.especialidadProfesional
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
						<div className="col-span-4 sm:col-span-9">
							<div className="bg-white shadow rounded-lg p-6">
								<h2 className="text-xl font-bold mb-4">Demandas</h2>
								<div className="bg-white">
									<div className="max-w-xl mx-auto p-8">
										<div className="flow-root">
											<ul className="-mb-8">
												<li>
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
																		<a
																			href="#"
																			className="font-medium text-gray-900 mr-2"
																		>
																			Colegio San Martin [demanda 8]
																		</a>

																		<a
																			href="#"
																			className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm"
																		>
																			<div className="absolute flex-shrink-0 flex items-center justify-center">
																				<span
																					className="h-1.5 w-1.5 rounded-full bg-green-500"
																					aria-hidden="true"
																				></span>
																			</div>
																			<div className="ml-3.5 font-medium text-gray-900">
																				En Curso
																			</div>
																		</a>
																	</div>
																	<span className="whitespace-nowrap text-sm">
																		Hace 10 horas
																	</span>
																</div>
																<div className="mt-2 text-gray-700">
																	<p>
																		- Se agrego un anexo a la demanda.
																		<br></br>- Se creo una nota.
																	</p>
																</div>
															</div>
														</div>
													</div>
												</li>
												<li>
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
																		<a
																			href="#"
																			className="font-medium text-gray-900 mr-2"
																		>
																			Colegio Formacion Docente [demanda 4]
																		</a>

																		<a
																			href="#"
																			className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm"
																		>
																			<div className="absolute flex-shrink-0 flex items-center justify-center">
																				<span
																					className="h-1.5 w-1.5 rounded-full bg-green-500"
																					aria-hidden="true"
																				></span>
																			</div>
																			<div className="ml-3.5 font-medium text-gray-900">
																				En curso
																			</div>
																		</a>
																	</div>
																	<span className="whitespace-nowrap text-sm">
																		Hace 1 semana
																	</span>
																</div>
																<div className="mt-2 text-gray-700">
																	<p>
																		- Se creo una nota.
																		<br></br>
																	</p>
																</div>
															</div>
														</div>
													</div>
												</li>

												<li>
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
																		<a
																			href="#"
																			className="font-medium text-gray-900 mr-2"
																		>
																			Colegio San Martin [demanda 18]
																		</a>

																		<a
																			href="#"
																			className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm"
																		>
																			<div className="absolute flex-shrink-0 flex items-center justify-center">
																				<span
																					className="h-1.5 w-1.5 rounded-full bg-red-500"
																					aria-hidden="true"
																				></span>
																			</div>
																			<div className="ml-3.5 font-medium text-gray-900">
																				Demorada
																			</div>
																		</a>
																	</div>
																	<span className="whitespace-nowrap text-sm">
																		Hace 1 mes
																	</span>
																</div>
																<div className="mt-2 text-gray-700">
																	<p>
																		- Se agrego nota a la demanda.
																		<br></br>
																	</p>
																</div>
															</div>
														</div>
													</div>
												</li>
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
