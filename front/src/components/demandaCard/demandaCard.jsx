import React, { useState } from "react";
import DemandaModal from "@/components/demandaModal/demandaModal";
import EstadoSpan from "@/components/estadoSpan/estadoSpan";

function DemandaCard(props) {
	const {
		motivoDemanda,
		tituloDemanda,
		fotoProfesional,
		nombreEstado,
		nombrePersona,
		nombreEspecialidad,
		nombreOrganizacion,
		idDemanda,
		fechaIngresoDemanda,
		nombreTipo,
	} = props;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<li className="py-3 sm:py-4">
			<div className="flex items-center space-x-4">
				<div className="flex-shrink-0">
					<img
						className="w-8 h-8 rounded-full"
						src={fotoProfesional}
						alt="photoProfesional"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
						{tituloDemanda}
					</p>
					<p className="text-sm text-gray-500 truncate dark:text-gray-400">
						{motivoDemanda}
					</p>
				</div>
				<div>
					<EstadoSpan nombreEstado={nombreEstado}></EstadoSpan>
				</div>
				<button
					type="button"
					className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
					onClick={openModal}
				>
					<svg
						className="w-6 h-6 text-gray-800 white:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 20"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4"
						/>
					</svg>
				</button>
			</div>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="absolute inset-0 bg-gray-800 opacity-60"></div>
					<div className="bg-white dark:bg-gray-800 p-4 rounded-lg z-10">
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="readProductModal"
							onClick={closeModal}
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
							<span className="sr-only">Cerrar Demanda</span>
						</button>
						<DemandaModal
							motivoDemanda={motivoDemanda}
							tituloDemanda={tituloDemanda}
							nombreEstado={nombreEstado}
							fotoProfesional={fotoProfesional}
							nombreTipo={nombreTipo}
							nombreOrganizacion={nombreOrganizacion}
							nombreEspecialidad={nombreEspecialidad}
							nombrePersona={nombrePersona}
							idDemanda={idDemanda}
							fechaIngresoDemanda={fechaIngresoDemanda}
						></DemandaModal>
					</div>
				</div>
			)}
		</li>
	);
}

export default DemandaCard;
