import Link from "next/link";
import React, { useState } from "react";
import SelectProfesional from "@/components/selectProfesional/selectProfesional";
import { useAlertContext } from "@/context/alertContext";

function GrupoModal(props) {
	const { idDemanda, grupo, obtenerDemanda } = props;

	const { crearAlert } = useAlertContext();

	const [isModalGrupoOpen, setIsModalOpenGrupo] = useState(false);
	const handleModalGrupo = () => {
		setIsModalOpenGrupo(() => !isModalGrupoOpen);
	};

	const handleSacarProfesionalGrupo = (id) => {
		fetch("http://localhost/devtic/api/EliminarProfesionalDelGrupo.php", {
			body: JSON.stringify({
				idDemanda: idDemanda,
				idProfesional: id,
			}),
			credentials: "include",
			method: "POST",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Error al eliminar el profesional del grupo", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				obtenerDemanda();
				crearAlert(res);
			})
			.catch((e) => {
				const errorMessage = e.cause?.error || e.message;
				crearAlert({ error: errorMessage });
			});
	};

	return (
		<>
			<button
				type="button"
				onClick={handleModalGrupo}
				className="inline-flex relative items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-10 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
					/>
				</svg>
				Grupo
			</button>

			<div>
				<div
					className={`fixed top-0 left-0 bg-black w-screen h-screen bg-opacity-60 flex items-center justify-center z-50 ${
						isModalGrupoOpen ? "" : "hidden"
					}`}
				>
					<div className="bg-white dark:bg-gray-800 p-10 flex flex-col rounded-lg ">
						<div className=" flex items-center mb-4">
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  inline-flex dark:hover:bg-gray-600 dark:hover:text-white w-max self-start"
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
								<span className="sr-only">Cerrar</span>
							</button>
							<h2 className=" flex-1 text-center text-xl ">
								Grupo de la Demanda
							</h2>
						</div>
						<SelectProfesional
							idDemanda={idDemanda}
							grupo={grupo}
							obtenerDemanda={obtenerDemanda}
						/>
						<div className=" flex flex-row justify-center w-full overflow-x-auto overflow-y-hidden space-x-5">
							{grupo.map((i) => {
								return (
									<div
										key={i.idProfesional}
										className=" bg-white border w-72 h-72 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
									>
										<div className="flex flex-col items-center h-full">
											<img
												className="w-24 h-24 mb-3 rounded-full shadow-lg mt-4"
												src={i.fotoProfesional}
												alt="profesionalFoto"
											/>
											<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
												{i.nombrePersona
													.toLowerCase()
													.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
														return letter.toUpperCase();
													})}
											</h5>
											{i.creadorGrupo == 1 ? (
												<span className="text-sm text-gray-500 dark:text-gray-400">
													Creador de la demanda
												</span>
											) : null}
											<span className="text-sm text-gray-500 dark:text-gray-400">
												{i.nombreEspecialidad
													.toLowerCase()
													.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
														return letter.toUpperCase();
													})}
											</span>
											<div className="flex items-end justify-center flex-1 pb-4">
												<Link
													href={`/perfiles/${i.idProfesional}`}
													className="bg-blue-700 text-white p-2 rounded-lg"
												>
													Perfil
												</Link>
												<button
													onClick={() =>
														handleSacarProfesionalGrupo(i.idProfesional)
													}
													className="bg-red-700 text-white p-2 rounded-lg ml-4"
												>
													Sacar
												</button>
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
