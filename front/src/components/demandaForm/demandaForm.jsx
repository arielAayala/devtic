"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import PersonaInvolucradaForm from "../personaInvolucradaForm/personaInvolucradaForm";

function DemandaForm() {
	const { crearAlert } = useAlertContext();
	const [organizaciones, setOrganizaciones] = useState([]);
	const [loader, setLoader] = useState(false);
	const [personasInvolucradas, setPersonasInvolucradas] = useState([]);
	const [inputFiles, setInputFiles] = useState(null);

	const [input, setInput] = useState({
		motivoDemanda: null,
		relatoDemanda: null,
		idTipo: null,
		idOrganizacion: null,
		almacenDemanda: null,
		personasInvolucradas: null,
	});

	const textbox = useRef(null);

	const adjustHeight = () => {
		textbox.current.style.height = "inherit";
		textbox.current.style.height = `${textbox.current.scrollHeight}px`;
	};

	useLayoutEffect(adjustHeight, []);

	const handleKeyDown = (e) => {
		adjustHeight();
		handleChange(e);
	};

	const listarOrganizaciones = () => {
		fetch("http://localhost/devtic/api/ListarOrganizaciones.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Error al listar las organizaciones", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				setOrganizaciones(res);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				console.error(error.cause?.error || error.message);
			});
	};

	/* DATA PARA PERSONAS INVOLUCRADAS */

	const [esDemandante, setEsDemandante] = useState(false);

	const [curso, setCurso] = useState({
		grado: null,
		turno: null,
		docente: null,
	});

	const [demandante, setDemandante] = useState({
		nombrePersona: null,
		dniPersona: null,
		idLocalidad: null,
		telefono: null,
		domicilio: null,
		demandante: true,
		idParentesco: null,
	});

	const [alumno, setAlumno] = useState({
		nombrePersona: null,
		dniPersona: null,
		idLocalidad: null,
		telefono: null,
		domicilio: null,
		demandante: false,
		idParentesco: null,
	});

	const submitPersonaInvolucrada = () => {
		let personaInvolucradas = [];
		if (input.idTipo != 3) {
			personaInvolucradas = [
				{
					...demandante,
					alumno: false,
					grado: null,
					turno: null,
					docente: null,
					idParentesco: null,
				},
			];
		} else {
			if (esDemandante) {
				personaInvolucradas = [{ ...demandante, ...curso, alumno: true }];
			} else {
				personaInvolucradas = [
					{
						...demandante,
						grado: null,
						turno: null,
						docente: null,
						alumno: false,
					},
					{ ...alumno, ...curso, alumno: true },
				];
			}
		}

		return personaInvolucradas;
	};

	useEffect(() => {
		console.log("personas");
		setPersonasInvolucradas(submitPersonaInvolucrada());
		setInput({
			...input,
			personasInvolucradas: personasInvolucradas,
		});
	}, [demandante, alumno, curso, esDemandante, input.idTipo]);

	console.log(input);

	const handleSubmit = (e) => {
		e.preventDefault();
		setPersonasInvolucradas(submitPersonaInvolucrada());
		setInput({
			...input,
			personasInvolucradas: personasInvolucradas,
		});

		const formData = new FormData();
		formData.append("motivoDemanda", input.motivoDemanda);
		formData.append("relatoDemanda", input.relatoDemanda);
		formData.append("idTipo", input.idTipo);
		formData.append("idOrganizacion", input.idOrganizacion);
		formData.append("almacenDemanda", input.almacenDemanda);

		for (let i = 0; i < input.personasInvolucradas.length; i++) {
			formData.append("personasInvolucradas[]", input.personasInvolucradas[i]);
		}

		/* motivoDemanda: null,
		relatoDemanda: null,
		idTipo: null,
		idOrganizacion: null,	
		almacenDemanda: null,
		personasInvolucradas: null, */

		for (let i = 0; i < inputFiles.length; i++) {
			formData.append("anexosDemanda[]", inputFiles[i]);
		}
		console.log(formData.getAll("personasInvolucradas[]"));
		fetch("http://localhost/devtic/api/CrearDemanda.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: formData,
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error", { cause: await res.json() });
				}
				return res.json();
			})
			.then((res) => {
				document.getElementById("formDemanda").reset();
				crearAlert(res);
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				crearAlert({ error: errorMessage });
			});
	};

	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};
	const handleChangeFiles = (e) => {
		setInputFiles(e.target.files);
	};

	useEffect(() => {
		listarOrganizaciones();
	}, []);

	return (
		<>
			<form
				id="formDemanda"
				onSubmit={handleSubmit}
			>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="mt-2 text-base font-semibold leading-7 text-gray-900">
							Recepción de Casos
						</h2>
						<p className="mt-1 mb-4  text-sm leading-6 text-gray-600">
							Aqui se narran todos los detalles de los casos.
						</p>
						<div className="sm:col-span-4">
							<label
								htmlFor="motivoDemanda"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Motivo
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										onChange={handleChange}
										type="text"
										name="motivoDemanda"
										id="motivoDemanda"
										autoComplete="off"
										className="block flex-1 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="Ingrese un motivo aqui"
									/>
								</div>
							</div>
						</div>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
							<div className="col-span-full">
								<label
									htmlFor="idTipo"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Tipo
								</label>
								<div className="mt-2">
									<select
										onChange={handleChange}
										name="idTipo"
										id="idTipo"
										className="block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									>
										<option value>Seleccione una opción</option>
										<option value={1}>Invitación</option>
										<option value={2}>Solicitud</option>
										<option value={3}>Expediente</option>
									</select>
								</div>
							</div>
							<div className="sm:col-span-4">
								<PersonaInvolucradaForm
									idTipo={input.idTipo}
									alumno={alumno}
									setAlumno={setAlumno}
									demandante={demandante}
									setDemandante={setDemandante}
									esDemandante={esDemandante}
									setEsDemandante={setEsDemandante}
									curso={curso}
									setCurso={setCurso}
								/>
							</div>
						</div>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="col-span-full">
								<label
									htmlFor="idOrganizacion"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Organizacion de la que proviene la demanda
								</label>
								<div className="mt-2">
									<select
										onChange={handleChange}
										type="text"
										name="idOrganizacion"
										id="idOrganizacion"
										className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
										autoComplete="organization"
									>
										<option value={0}>Seleccione una opción</option>
										{loader ? (
											organizaciones.map((i) => (
												<option
													key={i.idOrganizacion}
													value={i.idOrganizacion}
												>
													{i.nombreOrganizacion}
												</option>
											))
										) : (
											<option>Cargando organizaciones</option>
										)}
									</select>
								</div>
							</div>
							<div className="col-span-full">
								<label
									htmlFor="relatoDemanda"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Relato de la Situacion
								</label>
								<div className="mt-2">
									<textarea
										onChange={handleKeyDown}
										ref={textbox}
										name="relatoDemanda"
										id="relatoDemanda"
										rows="3"
										autoComplete="off"
										className="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									></textarea>
								</div>
								<p className="mt-3 text-sm leading-6 text-gray-600">
									Relate brevemente la situacion de la demanda.
								</p>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="almacenDemanda"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Lugar de almacenamiento
								</label>
								<div className="mt-2">
									<textarea
										onChange={handleChange}
										type="text"
										name="almacenDemanda"
										id="almacenDemanda"
										autoComplete="off"
										className="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
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
									name="anexosDemanda"
									multiple
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Guardar
					</button>
				</div>
			</form>
		</>
	);
}

export default DemandaForm;
