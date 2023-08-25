"use client";
import React, { useEffect, useState } from "react";
import DemandasCard from "@/components/demandaCard/demandaCard";

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
				rest.json();
			})
			.then((rest) => {
				setDemandas(rest ?? []);
				setLoader(true);
				console.log(rest);
			});
	};
	const [demandas, setDemandas] = useState([]);

	useEffect(() => {
		console.log(demandas);
		obtenerDemandas();
	}, []);

	if (!loader) {
		return <div>Cargando</div>;
	}

	return (
		<div>
			{demandas.map((i, index) => {
				<DemandasCard key={index}></DemandasCard>;
			})}
		</div>
	);
}
export default Demandas;
