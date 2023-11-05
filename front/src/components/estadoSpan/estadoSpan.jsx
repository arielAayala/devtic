import React, { useState } from "react";

function EstadoSpan(props) {
	const { nombreEstado } = props;

	let estadoClass = "";

	switch (nombreEstado) {
		case "En curso":
			estadoClass =
				"bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300";
			break;
		case "Terminado":
			estadoClass =
				"bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300";
			break;
		case "Demorado":
			estadoClass =
				"bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300";
			break;
		case "Pendiente":
			estadoClass =
				"bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300";
			break;
		default:
			estadoClass = "";
	}
	return (
		<span
			className={`inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${estadoClass}`}
		>
			{nombreEstado}
		</span>
	);
}
export default EstadoSpan;
