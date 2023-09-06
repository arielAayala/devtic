"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";

function DemandaModalUpdate(props) {
	const {
		obtenerDemanda,
		idDemanda,
		tituloDemanda,
		motivoDemanda,
		idTipo,
		idOrganizacion,
		almacenDemanda,
	} = props;

	const { crearAlert } = useAlertContext();
	const [organizaciones, setOrganizaciones] = useState([]);
	const [loader, setLoader] = useState(false);
	const [input, setInput] = useState({
		idDemanda: idDemanda,
		tituloDemanda: tituloDemanda,
		motivoDemanda: motivoDemanda,
		idTipo: idTipo,
		idOrganizacion: idOrganizacion,
		almacenDemanda: almacenDemanda,
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
			.then((res) => {
				return res.json();
			})
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
		fetch("http://localhost/devtic/api/ActualizarDemanda.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(input),
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
				obtenerDemanda();
			})
			.catch((error) => {
				crearAlert(error);
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
			onSubmit={handleSubmit}
			className=" w-screen px-8"
		>
			<h3 className="mb-4">Actualizar Demanda</h3>
			{/* INGRESAR UN TITULO PARA LA DEMANDA */}
			<div className="relative z-0 w-full mb-6 group">
				<input
					onChange={handleChange}
					type="text"
					name="tituloDemanda"
					id="tituloDemanda"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required=""
					defaultValue={tituloDemanda}
				/>
				<label
					htmlFor="tituloDemanda"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Titulo
				</label>
			</div>

			{/* ESCRIBIR EL MOTIVO DE LA DEMANDA */}
			<div className="relative z-0 w-full mb-6 group">
				<textarea
					onChange={handleKeyDown}
					ref={textbox}
					type="text"
					name="motivoDemanda"
					id="motivoDemanda"
					className="block  py-4 resize-none h-min overflow-y-hidden px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					required=""
					defaultValue={motivoDemanda}
				/>
				<label
					htmlFor="motivoDemanda"
					className="absolute font-medium text-lg  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Motivo
				</label>
			</div>
			{/* BUSCAR INSTITUCIONES */}
			<div className="relative z-0 w-full mb-6 group">
				{loader ? (
					<select
						onChange={handleChange}
						type="search"
						name="idOrganizacion"
						id="idOrganizacion"
						className="block  px-0 w-full pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required=""
						value={idOrganizacion}
					>
						<option
							className=" text-xs"
							value={0}
						>
							Seleccione una opcion
						</option>
						{organizaciones.map((i) => {
							return (
								<option
									className=" text-xs"
									key={i.idOrganizacion}
									value={i.idOrganizacion}
								>
									{i.nombreOrganizacion}
								</option>
							);
						})}
					</select>
				) : (
					<select
						onChange={handleChange}
						type="search"
						className="block  px-0 w-full pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required=""
					>
						<option className=" text-xs">Cargando organizaciones</option>
					</select>
				)}

				<label
					htmlFor="idOrganizacion"
					className="font-medium absolute text-lg  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Organización
				</label>
			</div>
			{/* Tipo de demanda */}
			<div className="relative z-0 w-full mb-6 group">
				<select
					onChange={handleChange}
					type="search"
					name="idTipo"
					id="idTipo"
					className="block  px-0 w-full pt-4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required=""
					defaultValue={parseInt(idTipo)}
				>
					<option
						className=" text-xs"
						value={0}
					>
						Seleccione una opcion
					</option>
					<option
						className=" text-xs"
						value={1}
					>
						Invitacion
					</option>
					<option
						className=" text-xs"
						value={2}
					>
						Solicitud
					</option>
					<option
						className=" text-xs"
						value={3}
					>
						Expediente
					</option>
				</select>
				<label
					htmlFor="idTipo"
					className="font-medium absolute text-lg  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Tipo
				</label>
			</div>
			{/* INGRESAR UN almacen PARA LA DEMANDA */}
			<div className="relative z-0 w-full mb-6 group">
				<input
					onChange={handleChange}
					type="text"
					name="almacenDemanda"
					id="almacenDemanda"
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					required=""
					defaultValue={almacenDemanda ?? ""}
				/>
				<label
					htmlFor="almacenDemanda"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					Demanda almacenada en
				</label>
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Actualizar
			</button>
		</form>
	);
}

export default DemandaModalUpdate;