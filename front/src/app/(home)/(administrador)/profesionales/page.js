"use client";
import TableProfesionales from "@/components/tableProfesionales/tableProfesionales";
import React, { useState, useEffect } from "react";

function AdministradorPage() {
	const [profesionales, setProfesionales] = useState([]);

	const obtenerProfesionales = () => {
		fetch("http://localhost/devtic/api/ListarProfesionales.php", {
			method: "GET",
			credentials: "include",
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
				setProfesionales(res);
			})
			.catch((error) => {
				const errorMessage = error.cause?.error || error.message;
				console.error(errorMessage);
				profesionales([]);
			});
	};

	useEffect(() => {
		obtenerProfesionales();
	}, []);

	return (
		<>
			<TableProfesionales
				obtenerProfesionales={obtenerProfesionales}
				profesionales={profesionales}
				estadistica={false}
			/>
		</>
	);
}

export default AdministradorPage;
