import React from "react";

function PersonasInvolucradas(props) {
	const { lstPersonasInvolucradas } = props;

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto  ">
				<div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
					<p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
						Personas Involucradas a la demanda
					</p>
				</div>
				<div className="grid gap-2 grid-cols-2  mb-6 ">
					{lstPersonasInvolucradas.map((i) => {
						return (
							<div
								key={i.idPersonaInvolucrada}
								className="items-center bg-gray-50 rounded-lg shadow flex dark:bg-gray-800  dark:border-gray-700 "
							>
								<div className="p-5 ">
									<h3 className="text-sm font-bold  text-gray-900 dark:text-white ">
										{i.nombrePersona}
									</h3>

									<span className="font-normal dark:text-gray-400">
										Documento: {i.dniPersona}
									</span>

									<p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
										{i.demandante == 1 ? "Es la persona demandante" : ""}
									</p>
									{i.alumno == 1 ? (
										<ul className="flex space-x-4 sm:mt-0 flex-col mb-4">
											<h3 className="text-sm font-bold mb-2 text-gray-900 dark:text-white ">
												Detalle del alumno:
											</h3>
											<li className="flex justify-start items-center">
												{i.nombreGrado} grado
											</li>
											<li className="flex justify-start items-center">
												Turno: {i.nombreTurno}
											</li>
											<li className="flex justify-start items-center">
												Docente: {i.docente}
											</li>
										</ul>
									) : null}
									<ul className="flex space-x-4 sm:mt-0 flex-col">
										<h3 className="text-sm font-bold mb-2 text-gray-900 dark:text-white ">
											Contacto:
										</h3>
										<li className="flex justify-start items-center">
											<svg
												className="w-4 h-4 mr-1 text-gray-800 dark:text-white"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 18 18"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"
												/>
											</svg>
											{i.numeroTelefono}
										</li>
										<li className="flex justify-start items-center">
											<svg
												className="w-4 h-4 mr-1 text-gray-800 dark:text-white"
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
													d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
												/>
											</svg>
											{i.nombreLocalidad} - {i.direccionDomicilio}
										</li>
									</ul>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default PersonasInvolucradas;
