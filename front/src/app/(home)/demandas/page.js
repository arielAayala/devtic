"use client";
import React, { useEffect, useState } from "react";
import DemandaCard from "@/components/demandaCard/demandaCard";
import Skeleton from "@/components/skeleton/skeleton";
import SearchForm from "@/components/searchForm/searchForm";
import Pagination from "@/components/pagination/pagination";
import Link from "next/link";
import DemandaFilter from "@/components/demandaFilter/demandaFilter";
import { useAlertContext } from "@/context/alertContext";

function Demandas() {
	const { crearAlert } = useAlertContext();

	const [demandas, setDemandas] = useState([]);
	const [loader, setLoader] = useState(false);
	const [page, setPage] = useState(1);
	const [flags, setFlags] = useState(0);
	const [inputs, setInputs] = useState({
		idEstado: 0,
		idTipo: 0,
		idOrganizacion: 0,
		fechaCierreDemanda: null,
		fechaIngresoDemanda: null,
	});

	const obtenerDemandas = (pagina = null) => {
		setFlags(0);
		fetch("http://localhost/devtic/api/ObtenerTodasDemandas.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ pagina: pagina || page }),
		})
			.then(async (rest) => {
				{
					if (!rest.ok) {
						throw new Error("Ocurrio un error al cargar las demandas", {
							cause: await rest.json(),
						});
					}
					return rest.json();
				}
			})
			.then((rest) => {
				setDemandas(rest ?? []);
				setTimeout(() => setLoader(true), 100);
			})
			.catch((e) => {
				const error = e.cause?.error || e.message;
				crearAlert({ error: error });
			});
	};

	const obtenerDemandasConFiltros = (body, pagina = null) => {
		setFlags(1);
		fetch("http://localhost/devtic/api/ObtenerDemandaPorFiltros.php", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({ ...body, pagina: pagina || page }),
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al filtrar las demanda", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				console.log(res);
				setDemandas(res);
			})
			.catch((e) => {
				const error = e.cause?.error || e.message;
				crearAlert({ error: error });
			});
	};

	useEffect(() => {
		if (flags == 0) {
			obtenerDemandas();
		} else {
			obtenerDemandasConFiltros(inputs);
		}
	}, [page]);

	return (
		<main>
			<SearchForm />
			<DemandaFilter
				inputs={inputs}
				setInputs={setInputs}
				obtenerDemandasConFiltros={obtenerDemandasConFiltros}
				obtenerDemandas={obtenerDemandas}
				flags={flags}
			/>
			

			{loader ? (
				<div className="my-10">
					{demandas.data.length === 0 ? (
						<h3>No hay Demandas</h3>
					) : (
						<>
							<ul className="max-w-full  divide-y divide-gray-200 dark:divide-gray-700">
								{demandas.data.map((i) => {
									return (
										<DemandaCard
											key={i.idDemanda}
											motivoDemanda={i.motivoDemanda}
											relatoDemanda={i.relatoDemanda}
											nombreEstado={i.nombreEstado}
											fotoProfesional={i.fotoProfesional}
											nombreTipo={i.nombreTipo}
											nombreOrganizacion={i.nombreOrganizacion}
											nombreEspecialidad={i.nombreEspecialidad}
											nombrePersona={i.nombrePersona}
											idDemanda={i.idDemanda}
											fechaIngresoDemanda={i.fechaIngresoDemanda}
										></DemandaCard>
									);
								})}
							</ul>
							<Pagination
								paginaNumero={demandas.paginaNumero}
								total={demandas.demandasTotales}
								page={page}
								setPage={setPage}
							></Pagination>
						</>
					)}
				</div>
			) : (
				<div className="my-10">
					<Skeleton />
				</div>
			)}
		</main>
	);
}

export default Demandas;
