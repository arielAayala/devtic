import { useAlertContext } from "@/context/alertContext";
import { useAuthContext } from "@/context/authContext";
import React, { useState } from "react";

function NotasModalForm({ idDemanda }) {
	const [showModal, setShowModal] = useState(false);

	const { crearAlert } = useAlertContext();
	const { cerrarSesion } = useAuthContext();

	const [input, setInput] = useState({
		tituloNota: null,
		descripcionNota: null,
		idTipoNota: null,
		idDemanda: idDemanda,
	});

	const [inputFile, setInputFile] = useState(null);

	const handleShowModal = () => {
		setShowModal(() => !showModal);
	};

	const handleChange = (e) => {
		setInput(() => {
			return { ...input, [e.target.name]: e.target.value };
		});
	};

	const handleChangeFiles = (e) => {
		setInputFile(() => {
			return { anexosNotas: e.target.files };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append(idDemanda, input.idDemanda);
		formData.append(tituloNota, input.tituloNota);
		console.log(formData);
		formData.append(descripcionNota, input.descripcionNota);
		formData.append(idTipoNota, input.idTipoNota);
		formData.append(anexosNotas, inputFile.anexosNotas);
		fetch("http://localhost/devtic/api/CrearNota.php", {
			method: "POST",
			body: formData,
			credentials: "include",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un Error", { cause: await res.json() });
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
			})
			.catch((error) => {
				const errorMessage = error.cause.error || "Ocurrio un Error";
				crearAlert({ error: errorMessage });
				console.log(error.code);
			});
	};
	console.log(input);
	console.log(inputFile);

	return (
		<>
			{/* <!-- Modal toggle --> */}
			<button
				type="button"
				onClick={handleShowModal}
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
				Notas
			</button>

			{/* <!-- Main modal --> */}

			<div
				className={`fixed top-0 left-0 right-0 z-50  w-screen h-screen flex justify-center items-center p-4 bg-black bg-opacity-60  ${
					showModal ? "" : "hidden"
				}`}
			>
				<div className="relative w-full max-w-md max-h-full">
					{/*  <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700  h-max overflow-y-auto">
						<button
							type="button"
							onClick={handleShowModal}
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Cerrar</span>
						</button>
						<div className="px-6 py-6 lg:px-8 ">
							<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
								Agregar Nota
							</h3>
							<form
								className="space-y-6 "
								onSubmit={handleSubmit}
							>
								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="col-span-full">
										<label
											htmlFor="tituloNota"
											className="block text-sm text-left font-medium leading-6 text-gray-900"
										>
											Titulo de la nota
										</label>
										<div className="mt-2">
											<input
												onChange={handleChange}
												type="text"
												name="tituloNota"
												id="tituloNota"
												autoComplete="off"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="col-span-full">
										<label
											htmlFor="descripcionNota"
											className="block text-sm text-left font-medium leading-6 text-gray-900"
										>
											Descripción de la Nota
										</label>
										<div className="mt-2">
											<textarea
												onChange={handleChange}
												name="descripcionNota"
												autoComplete="off"
												rows={5}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  resize-none overflow-y-auto"
											></textarea>
										</div>
										<p className="mt-3 text-sm leading-6 text-gray-600">
											Relate brevemente una descripción de la nota.
										</p>
									</div>

									<div className="col-span-full">
										<label
											htmlFor="idTipoNota"
											className="block text-sm font-medium text-left leading-6 text-gray-900"
										>
											Tipo
										</label>
										<div className="mt-2">
											<select
												onChange={handleChange}
												name="idTipoNota"
												id="idTipoNota"
												className="block border-0 bg-transparent w-full py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											>
												<option>Seleccione una opción</option>
												<option value={1}>Acciones a realizar</option>
												<option value={2}>Orientaciones</option>
												<option value={3}>Notas remitidas</option>
												<option value={4}>Observaciones</option>
											</select>
										</div>
									</div>
									<div className="col-span-full">
										<label className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">
											Subir Anexos
										</label>
										<input
											onChange={handleChangeFiles}
											className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
											type="file"
											name="anexosNotas"
											multiple
										/>
									</div>
								</div>
								<button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									Agregar Nota
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NotasModalForm;
