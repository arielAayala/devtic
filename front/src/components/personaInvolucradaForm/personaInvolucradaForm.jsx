"use client";
import React, { useEffect, useRef, useState } from "react";

function PersonaInvolucradaForm(props) {
	const {
		alumno,
		setAlumno,
		demandante,
		setDemandante,
		esDemandante,
		setEsDemandante,
		curso,
		setCurso,
	} = props;
	const [loader, setLoader] = useState(false);
	const [localidades, setLocalidades] = useState([]);

	const handleChangeEsDemandante = () => {
		setEsDemandante(!esDemandante);
	};

	const handleChange = (e) => {
		setDemandante({ ...demandante, [e.target.name]: e.target.value });
	};

	const handleChangeAlumno = (e) => {
		setAlumno({ ...alumno, [e.target.name]: e.target.value });
	};

	const handleChangeCurso = (e) => {
		setCurso({ ...curso, [e.target.name]: e.target.value });
	};

	const listarLocalidades = () => {
		fetch("http://localhost/devtic/api/ListarLocalidades.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al listar las organizaciones");
				}
				return res.json();
			})
			.then((res) => {
				setLocalidades(res);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	useEffect(() => {
		listarLocalidades();
	}, []);

	return (
		<>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-3">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Datos del Demandante
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Aqui se especifican los datos del demandante.
					</p>
				</div>
			</div>
			<div className="grid md:grid-cols-2 md:gap-6 mt-4">
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="nombrePersona"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						autoComplete="off"
						onChange={handleChange}
						required
					/>
					<label
						htmlFor="nombrePersona"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Nombre y apellido
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="dniPersona"
						autoComplete="off"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						onChange={handleChange}
						required
					/>
					<label
						htmlFor="dniPersona"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Documento
					</label>
				</div>
			</div>
			<div className="grid md:grid-cols-2 md:gap-6">
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="tel"
						pattern="^\+\d{2} \(\d{3}\) \d{3}-\d{4}$"
						autoComplete="off"
						name="telefono"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=""
						onChange={handleChange}
						required
					/>
					<label
						htmlFor="telefono"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Teléfono +54 (370) 123-4567
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="domicilio"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						onChange={handleChange}
						autoComplete="off"
						required
					/>
					<label
						htmlFor="domicilio"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Domicilio
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<label
						htmlFor="idOrganizacion"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Localidad del domicilio
					</label>
					<div className="mt-2">
						<select
							onChange={handleChange}
							required
							type="search"
							name="idLocalidad"
							className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							autoComplete="organization"
						>
							<option>Seleccione una opción</option>
							{loader ? (
								localidades.map((i) => (
									<option
										key={i.idLocalidad}
										value={i.idLocalidad}
									>
										{i.nombreLocalidad}
									</option>
								))
							) : (
								<option>Cargando localidades</option>
							)}
						</select>
					</div>
				</div>

				<fieldset>
					<h3>Tipo de relación</h3>
					<div className="mt-4 ml-4">
						<div className="flex items-center mb-4 ">
							<input
								type="radio"
								name="idParentesco"
								value="1"
								onChange={handleChange}
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="country-option-3"
								className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Ninguno
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								type="radio"
								onChange={handleChange}
								name="idParentesco"
								value="2"
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="country-option-1"
								className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Padre o Madre
							</label>
						</div>

						<div className="flex items-center mb-4">
							<input
								type="radio"
								name="idParentesco"
								onChange={handleChange}
								value="3"
								className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="country-option-2"
								className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Tutor Legal
							</label>
						</div>
					</div>
				</fieldset>
			</div>
			<div className="space-y-12 mt-10">
				<div className="border-b border-gray-900/10 pb-3">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Datos del alumno
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Aqui se especifican los datos del alumno.
					</p>
				</div>
			</div>
			<button
				onClick={handleChangeEsDemandante}
				type="button"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 my-6"
			>
				{esDemandante
					? "El alumno es demandante"
					: "El alumno no es demandante"}
			</button>
			<div className="grid md:grid-cols-2 md:gap-6 mt-4">
				{esDemandante ? null : (
					<>
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								name="nombrePersona"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								autoComplete="off"
								placeholder=" "
								required
								onChange={handleChangeAlumno}
							/>
							<label
								htmlFor="nombrePersona"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Nombre y apellido
							</label>
						</div>
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								name="dniPersona"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								autoComplete="off"
								placeholder=" "
								required
								onChange={handleChangeAlumno}
							/>
							<label
								htmlFor="dniPersona"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Documento
							</label>
						</div>
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								autoComplete="off"
								name="domicilio"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
								onChange={handleChangeAlumno}
							/>
							<label
								htmlFor="domicilio"
								required
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Domicilio
							</label>
						</div>
						<div className="relative z-0 w-full mb-6 group">
							<label
								htmlFor="idLocalidad"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Localidad del domicilio
							</label>
							<div className="mt-2">
								<select
									onChange={handleChangeAlumno}
									type="search"
									name="idLocalidad"
									className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									autoComplete="organization"
									required
								>
									<option value>Seleccione una opción</option>
									{loader ? (
										localidades.map((i) => (
											<option
												key={i.idLocalidad}
												value={i.idLocalidad}
											>
												{i.nombreLocalidad}
											</option>
										))
									) : (
										<option>Cargando localidades</option>
									)}
								</select>
							</div>
						</div>
					</>
				)}

				<div className="relative z-0 w-full mb-6 group">
					<label
						htmlFor="grado"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Grado
					</label>
					<div className="mt-2">
						<select
							onChange={handleChangeCurso}
							name="grado"
							id="grado"
							required
							className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option>Seleccione una opción</option>
							<option value={1}>Primer</option>
							<option value={2}>Segundo</option>
							<option value={3}>Tercer</option>
							<option value={4}>Cuarto</option>
							<option value={5}>Quinto</option>
							<option value={6}>Sexto</option>
							<option value={6}>Septimo</option>
						</select>
					</div>
				</div>

				<div className="relative z-0 w-full mb-6 group">
					<label
						htmlFor="turno"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Turno
					</label>
					<div className="mt-2">
						<select
							onChange={handleChangeCurso}
							name="turno"
							id="turno"
							required
							className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						>
							<option>Seleccione una opción</option>
							<option value={1}>Mañana</option>
							<option value={2}>Tarde</option>
						</select>
					</div>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="docente"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						autoComplete="off"
						placeholder=" "
						required
						onChange={handleChangeCurso}
					/>
					<label
						htmlFor="docente"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Docente
					</label>
				</div>
			</div>
		</>
	);
}

export default PersonaInvolucradaForm;
