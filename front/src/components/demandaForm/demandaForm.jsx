"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import PersonaInvolucradaForm from "../personaInvolucradaForm/personaInvolucradaForm";

function DemandaForm() {
	const { crearAlert } = useAlertContext();
	const [organizaciones, setOrganizaciones] = useState([]);
	const [loader, setLoader] = useState(false);

	const [personasInvolucradas, setPersonasInvolucradas] = useState([]);

	const [input, setInput] = useState({
		motivoDemanda: "",
		relatoDemanda: "",
		idTipo: "",
		idOrganizacion: "",
		almacenDemanda: "",
		personasInvolucradas: [],
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
			.then((res) => res.json())
			.then((res) => {
				setOrganizaciones(res);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				console.log(error);
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
		return esDemandante
			? [{ ...demandante, ...curso, alumno: true }]
			: [
					{
						...demandante,
						grado: null,
						turno: null,
						docente: null,
						alumno: false,
					},
					{ ...alumno, ...curso, alumno: true },
			  ];
	};

	useEffect(() => {
		setPersonasInvolucradas(submitPersonaInvolucrada());
		setInput({
			...input,
			personasInvolucradas: personasInvolucradas,
		});
	}, [demandante, alumno, curso, esDemandante]);

	const handleSubmit = (e) => {
		e.preventDefault();

		setInput({
			...input,
			personasInvolucradas: setPersonasInvolucradas(submitPersonaInvolucrada()),
		});

		console.log(input);
		fetch("http://localhost/devtic/api/CrearDemanda.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(input),
		})
			.then((res) => res.json())
			.then((res) => {
				crearAlert(res);
				document.getElementById("formDemanda").reset();
			})
			.catch((error) => {
				crearAlert(error);
				console.log(error);
			});
	};

	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
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
						<p className="mt-1 text-sm leading-6 text-gray-600">
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
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
									<input
										onChange={handleChange}
										type="text"
										name="motivoDemanda"
										id="motivoDemanda"
										autoComplete="username"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="Ingrese un motivo aqui"
									/>
								</div>
							</div>
						</div>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
							<div className="sm:col-span-4">
								<PersonaInvolucradaForm
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
									Escuela a la que asiste
								</label>
								<div className="mt-2">
									<select
										onChange={handleChange}
										type="search"
										name="idOrganizacion"
										id="idOrganizacion"
										className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
										autoComplete="about"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									></textarea>
								</div>
								<p className="mt-3 text-sm leading-6 text-gray-600">
									Relate brevemente la situacion de la demanda.
								</p>
							</div>

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
										className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									>
										<option value={0}>Seleccione una opción</option>
										<option value={1}>Invitación</option>
										<option value={2}>Solicitud</option>
										<option value={3}>Expediente</option>
									</select>
								</div>
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
										autoComplete="organization"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Guardar
					</button>
				</div>
			</form>
		</>
	);
}

export default DemandaForm;
