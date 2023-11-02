"use client";
import Estadisticas from "@/components/estadisticas/estadisticas";
import TableProfesionales from "@/components/tableProfesionales/tableProfesionales";
import React, { useState, useEffect } from "react";

function AdministradorEstadisticaPage() {
	const [estadisticas, setEstadisticas] = useState({});
	const [loader, setLoader] = useState(false);
	const [date, setDate] = useState({
		fechaInicio: null,
		fechaFinal: null,
	});

	const obtenerEstadisticas = () => {
		fetch("http://localhost/devtic/api/ObtenerEstadisticas.php", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify(date),
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al cargar los profesionales", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				setEstadisticas(res);
				setLoader(true);
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				console.error(errorMessage);
				setEstadisticas({});
			});
	};

	useEffect(() => {
		obtenerEstadisticas();
	}, []);

	if (!loader) {
		return <h1>Cargando...</h1>;
	}

	return (
		<>
			<h3 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
				{!date.fechaFinal & !date.fechaInicio
					? "En los ultimos 30 días"
					: `Desde ${date.fechaInicio} a ${date.fechaFinal}`}
			</h3>
			<Estadisticas
				demandasIngresadas={
					estadisticas.estadisticasGlobales.demandasIngresadas
				}
				demandasCerradas={estadisticas.estadisticasGlobales.demandasCerradas}
				notasIngresadas={estadisticas.estadisticasGlobales.notasIngresadas}
			/>
			<TableProfesionales
				obtenerProfesionales={obtenerEstadisticas}
				profesionales={estadisticas.estadisticaProfesionales}
				estadistica={true}
			/>
		</>
	);
}

export default AdministradorEstadisticaPage;
