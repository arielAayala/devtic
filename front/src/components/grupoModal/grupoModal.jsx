import Link from "next/link";
import React, { useState } from "react";

function GrupoModal({ grupo }) {
	const [isModalGrupoOpen, setIsModalOpenGrupo] = useState(false);
	const handleModalGrupo = () => {
		setIsModalOpenGrupo(() => !isModalGrupoOpen);
	};

	return (
		<>
			<button
				type="button"
				onClick={handleModalGrupo}
				className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
			>
				<svg
					className="w-3 h-3 mr-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
				</svg>
				Grupo
			</button>

			<div>
				<div
					className={`fixed top-0 left-0 bg-black w-screen h-screen bg-opacity-60 flex items-center justify-center z-50 ${
						isModalGrupoOpen ? "" : "hidden"
					}`}
				>
					<div className="bg-white dark:bg-gray-800  p-4 px-10 w-screen rounded-lg z-10 ">
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="readProductModal"
							onClick={handleModalGrupo}
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
							<span className="sr-only">Cerrar </span>
						</button>
						<div className=" flex flex-row justify-center w-full overflow-x-auto overflow-y-hidden">
							{grupo.map((i) => {
								return (
									<div
										key={i.idProfesional}
										className=" bg-white border w-72 h-72 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
									>
										<div className="flex justify-end px-4 pt-4">
											<button
												id="dropdownButton"
												data-dropdown-toggle="dropdown"
												className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
												type="button"
											>
												<span className="sr-only">Open dropdown</span>
												<svg
													className="w-5 h-5"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 16 3"
												>
													<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
												</svg>
											</button>
											<div
												id="dropdown"
												className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
											>
												<ul
													className="py-2"
													aria-labelledby="dropdownButton"
												>
													<li>
														<a
															href="#"
															className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
														>
															Eliminar Del Grupo
														</a>
													</li>
												</ul>
											</div>
										</div>
										<div className="flex flex-col items-center pb-10">
											<img
												className="w-24 h-24 mb-3 rounded-full shadow-lg"
												src={i.fotoProfesional}
												alt="profesionalFoto"
											/>
											<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
												{i.nombrePersona}
											</h5>
											{i.creadorGrupo == 1 ? (
												<span className="text-sm text-gray-500 dark:text-gray-400">
													Creador de la demanda
												</span>
											) : null}
											<span className="text-sm text-gray-500 dark:text-gray-400">
												{i.nombreEspecialidad}
											</span>

											<div className="flex mt-4 space-x-3 md:mt-6">
												<Link
													href={`/perfil`}
													className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
												>
													Ver Perfil
												</Link>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default GrupoModal;
