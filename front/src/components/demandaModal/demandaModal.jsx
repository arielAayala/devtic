import React, { useState } from "react";
import EstadoSpan from "@/components/estadoSpan/estadoSpan";
import { useRouter } from "next/navigation";

function DemandaModal(props) {
	const router = useRouter();

	const {
		motivoDemanda,
		tituloDemanda,
		fotoProfesional,
		nombreEstado,
		nombrePersona,
		nombreOrganizacion,
		idDemanda,
		fechaIngresoDemanda,
		nombreTipo,
		nombreEspecialidad,
	} = props;

	const handleRedirectToVerMas = () => {
		router.push(`/demandas/${idDemanda}`);
	};
	return (
		<div>
			<div className="flex justify-between mb-4 rounded-t sm:mb-5 ">
				<div class="flex items-center space-x-4">
					<img
						className="w-10 h-10 rounded-full"
						src={fotoProfesional}
						alt="photoProfesional"
					/>
					<div className="px-4 py-3">
						<p className="text-sm text-gray-900 dark:text-white">
							{nombrePersona
								.toLowerCase()
								.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
									return letter.toUpperCase();
								})}
						</p>
						<p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
							{nombreEspecialidad
								.toLowerCase()
								.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
									return letter.toUpperCase();
								})}
						</p>
					</div>
					<EstadoSpan nombreEstado={nombreEstado}></EstadoSpan>
				</div>
			</div>
			<dl>
				<dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
					{tituloDemanda}
				</dt>
				<dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
					Motivo
				</dt>
				<dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
					{motivoDemanda}
				</dd>
				<dt className="flex mb-2 font-semibold leading-none text-gray-900 dark:text-white">
					<svg
						class="w-6 h-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z" />
						<path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z" />
					</svg>
					Institucion
				</dt>
				<dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
					{nombreOrganizacion}
				</dd>
			</dl>
			<dt className="flex mb-2 font-semibold leading-none text-gray-900 dark:text-white">
				<svg
					className="w-6 h-6 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
				</svg>
				Fecha Ingreso
			</dt>
			<dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
				{fechaIngresoDemanda}
			</dd>

			<div className="flex justify-between items-center">
				<div className="flex items-center space-x-3 sm:space-x-4">
					<div class="flex items-center space-x-3 sm:space-x-4">
						<button
							type="button"
							className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							onClick={handleRedirectToVerMas}
						>
							Ver mas
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default DemandaModal;
