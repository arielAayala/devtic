import React, { useEffect, useState } from "react";

function PersonaInvolucradaForm() {
	const [loader, setLoader] = useState(false);
	const [localidades, setLocalidades] = useState([]);

	const [persona, setPersona] = useState({
		nombrePersona: null,
		dniPersona: null,
		localidad: null,
		telefono: null,
		correo: null,
		domicilio: null,
		demandante: null,
	});

	const listarLocalidades = () => {
		fetch("http://localhost/devtic/api/ListarLocalidades.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => res.json())
			.then((res) => {
				setLocalidades(res);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = () => {};

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
						name="floating_last_name"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_last_name"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Nombre y apellido
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="floating_last_name"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_last_name"
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
						pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
						name="floating_phone"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_phone"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Número De Teléfono
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="floating_company"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_company"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Dirección De Correo
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="text"
						name="floating_company"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_company"
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
							type="search"
							name="idOrganizacion"
							className="block border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							autoComplete="organization"
						>
							<option value={0}>Seleccione una opción</option>
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
					<div className="flex items-center mb-4">
						<input
							type="radio"
							name="countries"
							value="Spain"
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
							name="countries"
							value="USA"
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
							name="countries"
							value="Germany"
							className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="country-option-2"
							className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Tutor Legal
						</label>
					</div>

					<div className="flex items-center mb-4">
						<input
							type="radio"
							name="countries"
							value="Spain"
							className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="country-option-3"
							className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Hijo o Hija
						</label>
					</div>
				</fieldset>
			</div>
		</>
	);
}

export default PersonaInvolucradaForm;
