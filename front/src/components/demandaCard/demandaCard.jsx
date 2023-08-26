import React from "react";

function DemandaCard(props) {
	const { motivoDemanda, tituloDemanda, nombreEstado, fotoProfesional } = props;

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
				<span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
					<span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
					{nombreEstado}
				</span>
			</div>
		</li>
	);
}

export default DemandaCard;
