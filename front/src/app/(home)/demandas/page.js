"use client";
import React, { useEffect, useState } from "react";
import DemandaCard from "@/components/demandaCard/demandaCard";
import Skeleton from "@/components/skeleton/skeleton";
import SearchForm from "@/components/searchForm/searchForm";
import Pagination from "@/components/pagination/pagination";

function Demandas() {
	const [demandas, setDemandas] = useState([]);
	const [loader, setLoader] = useState(false);
	const obtenerDemandas = (page) => {
		fetch("http://localhost/devtic/api/ObtenerTodasDemandas.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ pagina: page }),
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

	const [page, setPage] = useState(1);
	useEffect(() => {
		console.log("peticion");
		obtenerDemandas(page);
	}, [page]);

	return (
		<main>
			<SearchForm></SearchForm>
			<div className="my-10">
				{loader ? (
					<ul className="max-w-full  divide-y divide-gray-200 dark:divide-gray-700">
						{demandas.data.map((i) => {
							return (
								<DemandaCard
									key={i.idDemanda}
									motivoDemanda={i.motivoDemanda}
									tituloDemanda={i.tituloDemanda}
									nombreEstado={i.nombreEstado}
									fotoProfesional={i.fotoProfesional}
								></DemandaCard>
							);
						})}
					</ul>
				) : (
					<Skeleton />
				)}
			</div>
			<Pagination
				paginaNumero={demandas.paginaNumero}
				total={demandas.demandasTotales}
				page={page}
				setPage={setPage}
			></Pagination>
		</main>
	);
}
export default Demandas;
