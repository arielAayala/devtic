import React, { useState } from "react";

function PersonaInvolucradaForm({ demandante = false }) {
	const [persona, setPersona] = useState({
		nombrePersona: null,
		dniPersona: null,
		localidad: null,
		telefono: null,
		correo: null,
		domicilio: null,
		demandante: null,
	});

	return (
		<>
			<form id="formPersonasInvolucradas">
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Datos del Demandante
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Aqui se especifican los datos del demandante.
						</p>
					</div>
				</div>
				<div class="grid md:grid-cols-2 md:gap-6">
					<div class="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_last_name"
							id="floating_last_name"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							for="floating_last_name"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Nombre y apellido
						</label>
					</div>
					<div class="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_last_name"
							id="floating_last_name"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							for="floating_last_name"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Documento
						</label>
					</div>
				</div>
				<div class="grid md:grid-cols-2 md:gap-6">
					<div class="relative z-0 w-full mb-6 group">
						<input
							type="tel"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							name="floating_phone"
							id="floating_phone"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							for="floating_phone"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Número De Teléfono
						</label>
					</div>
					<div class="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_company"
							id="floating_company"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							for="floating_company"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Dirección De Correo
						</label>
					</div>
					<div class="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_company"
							id="floating_company"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							for="floating_company"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Domicilio
						</label>
					</div>
					<div class="relative z-0 w-full mb-6 group">
						<label
							for="countries"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Localidad
						</label>
						<select
							id="countries"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option>United States</option>
							<option>Canada</option>
							<option>France</option>
							<option>Germany</option>
						</select>
					</div>

					<fieldset>
						<h3>Tipo de relación</h3>

						<div class="flex items-center mb-4">
							<input
								id="country-option-1"
								type="radio"
								name="countries"
								value="USA"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="country-option-1"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Padre o Madre
							</label>
						</div>

						<div class="flex items-center mb-4">
							<input
								id="country-option-2"
								type="radio"
								name="countries"
								value="Germany"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="country-option-2"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Tutor Legal
							</label>
						</div>

						<div class="flex items-center mb-4">
							<input
								id="country-option-3"
								type="radio"
								name="countries"
								value="Spain"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="country-option-3"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Hijo o Hija
							</label>
						</div>

						<div class="flex items-center mb-4">
							<input
								id="country-option-3"
								type="radio"
								name="countries"
								value="Spain"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="country-option-3"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Ninguno
							</label>
						</div>
					</fieldset>

					<fieldset>
						<h4>Roles </h4>

						<div class="flex items-center mb-4">
							<input
								id="roles-1"
								type="radio"
								name="roles"
								value="USA"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="roles-1"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Alumno/a
							</label>
						</div>

						<div class="flex items-center mb-4">
							<input
								id="roles-2"
								type="radio"
								name="roles"
								value="Germany"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="roles-2"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Profesor/a
							</label>
						</div>

						<div class="flex items-center mb-4">
							<input
								id="roles-3"
								type="radio"
								name="roles"
								value="Spain"
								class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="roles-3"
								class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Director/a
							</label>
						</div>
					</fieldset>
				</div>
			</form>
		</>
	);
}

export default PersonaInvolucradaForm;
