"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";

function DemandaForm() {
	const { crearAlert } = useAlertContext();
	const [organizaciones, setOrganizaciones] = useState([]);
	const [loader, setLoader] = useState(false);
	const [input, setInput] = useState({
		tituloDemanda: "",
		motivoDemanda: "",
		idTipo: "",
		idOrganizacion: "",
		almacenDemanda: "",
		personasInvolucradas: personasInvolucradas,
	});
	const [personasInvolucradas, setPersonasInvolucradas] = useState([]);

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

	const handleSubmit = (e) => {
		e.preventDefault();
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
		<form
			id="formDemanda"
			onSubmit={handleSubmit}
		>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Detalles de Demanda
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Aqui se detallan todos los aspectos de la demanda.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="tituloDemanda"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Titulo
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
										/
									</span>
									<input
										onChange={handleChange}
										type="text"
										name="tituloDemanda"
										id="tituloDemanda"
										autoComplete="username"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="Ingrese un titulo aqui"
									/>
								</div>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="motivoDemanda"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Motivo
							</label>
							<div className="mt-2">
								<textarea
									onChange={handleKeyDown}
									ref={textbox}
									name="motivoDemanda"
									id="motivoDemanda"
									rows="3"
									autoComplete="about"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								></textarea>
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600">
								Describa brevemente el motivo de la demanda.
							</p>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="idOrganizacion"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Organización
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
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900"
				>
					Cancelar
				</button>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Guardar
				</button>
			</div>
		</form>
	);
}

export default DemandaForm;
