"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useState } from "react";
import { useEffect } from "react";

function SelectProfesional(props) {
	const { idDemanda, grupo, obtenerDemanda } = props;

	const { crearAlert } = useAlertContext();
	const [profesionales, setProfesionales] = useState([]);
	const [loader, setLoader] = useState(false);
	const [profesional, setProfesional] = useState({
		idDemanda: idDemanda,
		idProfesional: null,
	});

	const listarProfesional = () => {
		fetch("http://localhost/devtic/api/ListarProfesionales.php", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al listar los profesionales");
				}
				return res.json();
			})
			.then((res) => {
				setProfesionales(res ?? []);
				setTimeout(() => setLoader(true), 1500);
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	const handleChange = (e) => {
		setProfesional({ ...profesional, idProfesional: e.target.value });
	};

	const handleSubmitProfesional = (e) => {
		e.preventDefault();
		fetch("http://localhost/devtic/api/AgregarProfesionalAlGrupo.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(profesional),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(
						"Ocurrio un error al agregar al profesional al grupo de trabajo"
					);
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
			})
			.then(() => {
				obtenerDemanda();
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	useEffect(() => {
		listarProfesional();
	}, []);

	return (
		<>
			<form
				onSubmit={handleSubmitProfesional}
				className=" flex justify-center mb-4 "
			>
				<div className="relative inline-center">
					<select
						id="idProfesional"
						onChange={handleChange}
						className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
					>
						<option>Seleccione un profesional</option>
						{loader ? (
							profesionales.map((i) => {
								if (grupo.every((g) => i.idProfesional != g.idProfesional)) {
									return (
										<option
											key={i.idProfesional}
											value={i.idProfesional}
										>
											{i.nombrePersona}
										</option>
									);
								} else {
									return null;
								}
							})
						) : (
							<option>Cargando profesionales</option>
						)}
					</select>
				</div>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 ml-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
				>
					Agregar profesional
				</button>
			</form>
		</>
	);
}

export default SelectProfesional;
