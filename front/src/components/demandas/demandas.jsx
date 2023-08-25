"use client";
import React, { useEffect, useState } from "react";
import DemandaCard from "@/components/demandaCard/demandaCard.jsx";
import Skeleton from "../skeleton/skeleton";

function Demandas() {
	const [loader, setLoader] = useState(false);

	const [demandas, setDemandas] = useState([]);

	const obtenerDemandas = () => {
		fetch("http://localhost/devtic/api/ObtenerTodasDemandas.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((rest) => {
				return rest.json();
			})
			.then((rest) => {
				setDemandas(rest);
				setTimeout(() => setLoader(true), 1000);
				console.log(rest);
			});
	};

	useEffect(() => {
		obtenerDemandas();
	}, []);

	if (!loader) {
		return <Skeleton />;
	}

	return (
		<div
			role="status"
			className=" p-4 space-y-4 border w-full border-gray-200 divide-y divide-gray-200 rounded shadow  dark:divide-gray-700 md:p-6 dark:border-gray-700"
		>
			{demandas.length === 0 ? (
				<div>No hay demandas</div>
			) : (
				demandas.map((i) => {
					return (
						<DemandaCard
							tituloDemanda={i.tituloDemanda}
							idDemanda={i.idDemanda}
							motivoDemanda={i.motivoDemanda}
							idEstado={i.idEstado}
							key={i.idDemanda}
						/>
					);
				})
			)}
		</div>
	);
}
export default Demandas;
