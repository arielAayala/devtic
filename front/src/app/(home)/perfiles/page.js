"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PaginationColegas from "@/components/paginationColegas/paginationColegas";

function Colegas() {
	const [profesionales, setProfesionales] = useState([]);

	const [loader, setLoader] = useState(false);

	const obtenerProfesionales = () => {
		fetch("http://localhost/devtic/api/ListarProfesionales.php", {
			method: "GET",
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al cargar los profesionales", {
						cause: res,
					});
				}
				return res.json();
			})
			.then((res) => {
				setProfesionales(res);
				setLoader(true);
			})
			.catch((error) => {
				console.error(error.error);
				profesionales([]);
			});
	};

	useEffect(() => {
		obtenerProfesionales();
	}, []);

	if (loader == false) {
		return <h1> Cargando ...</h1>;
	}
	return (
		<div>
			{profesionales.map((i) => (
				<div
					className="inline-flex ml-20"
					key={i.idProfesional}
				>
					<div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
						<div className="rounded-t-lg h-32 overflow-hidden">
							<img
								className="object-cover object-top w-full"
								src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
								alt=""
							/>
						</div>
						<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
							<img
								className="object-cover object-center h-32"
								src={i.fotoProfesional}
								alt="perfil"
							/>
						</div>
						<div className="text-center mt-2">
							<h2 className="font-semibold">
								{i.nombrePersona
									.toLowerCase()
									.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
										return letter.toUpperCase();
									})}
							</h2>
							<p className="text-gray-500">
								{i.nombreEspecialidad
									.toLowerCase()
									.replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
										return letter.toUpperCase();
									})}
							</p>
						</div>

						<div className="p-4 border-t mx-8 mt-2">
							<Link
								href={`/perfiles/${i.idProfesional}`}
								className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
							>
								Ver Perfil
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Colegas;
