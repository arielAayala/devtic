"use client";
import React, { useEffect, useState } from "react";
import DemandaCard from "@/components/demandaCard/demandaCard";
import Skeleton from "@/components/skeleton/skeleton";
import SearchForm from "@/components/searchForm/searchForm";
import Pagination from "@/components/pagination/pagination";
import Link from "next/link";
import DemandaFilter from "@/components/demandaFilter/demandaFilter";

function Demandas() {
	const [demandas, setDemandas] = useState([]);
	const [loader, setLoader] = useState(false);
	const [flags, setFlags] = useState(0);
	const [page, setPage] = useState(1);
	const [motivo, setMotivo] = useState("");
	const [motivoViejo, setMotivoViejo] = useState("");

	const onChangeMotivo = (e) => {
		setMotivo(e.target.value);
	};

	const obtenerDemandas = () => {
		setFlags(0);
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
				setTimeout(() => setLoader(true), 100);
			});
	};

	const obtenerPorMotivo = () => {
		if (motivoViejo != motivo) {
			setMotivoViejo(motivo);
			setPage(1);
		}

		setFlags(1);
		fetch("http://localhost/devtic/api/ObtenerDemandasPorMotivo.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				pagina: page,
				motivoDemanda: motivo,
			}),
		})
			.then((rest) => {
				return rest.json();
			})
			.then((rest) => {
				setDemandas(rest ?? []);
				setTimeout(() => setLoader(true), 100);
			});
	};

	useEffect(() => {
		obtenerDemandas();
	}, [page]);

	return (
		<main>
			<SearchForm
				onChangeMotivo={onChangeMotivo}
				submitMotivo={obtenerPorMotivo}
			></SearchForm>
			<DemandaFilter></DemandaFilter>
			<div className="border-b border-gray-200 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
					<li className="mr-1">
						<Link
							href="/crearDemanda"
							className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
						>
							<svg
								className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 18 20"
							>
								<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
							</svg>
							Agregar Demanda
						</Link>
					</li>
				</ul>
			</div>

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
