"use client";
import React, { useEffect, useState } from "react";
import DemandaCard from "@/components/demandaCard/demandaCard";
import Skeleton from "../skeleton/skeleton";

function Demandas() {
	const [loader, setLoader] = useState(false);
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
				setDemandas(rest ?? []);
				setTimeout(() => setLoader(true), 1500);
				console.log(rest);
			});
	};
	const [demandas, setDemandas] = useState([]);

	useEffect(() => {
		console.log(demandas);
		obtenerDemandas();
	}, []);

	if (!loader) {
		return <Skeleton></Skeleton>;
	}

	return (
		<ul className="max-w-full  divide-y divide-gray-200 dark:divide-gray-700">
			{demandas.map((i) => {
				return (
					<DemandaCard
						key={i.idDemanda}
						motivoDemanda={i.motivoDemanda}
						tituloDemanda={i.tituloDemanda}
						nombreEstado={i.nombreEstado}
					></DemandaCard>
				);
			})}
		</ul>
	);
}
export default Demandas;
