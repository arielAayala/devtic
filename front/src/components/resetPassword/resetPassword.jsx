"use client";
import { useAlertContext } from "@/context/alertContext";
import React, { useState } from "react";

function ResetPassword() {
	const { crearAlert } = useAlertContext();

	const [inputs, setInputs] = useState();

	const handleChangeInputs = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost/devtic/api/ReestablecerContrasena.php", {
			method: "POST",
			body: JSON.stringify(inputs),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error("Ocurrio un error al enviar el correo", {
						cause: await res.json(),
					});
				}
				return res.json();
			})
			.then((res) => {
				crearAlert(res);
			})
			.catch((e) => {
				const error = e.cause?.error || e.message;
				crearAlert({ error: error });
			});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 "
		>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Enviaremos un correo a su dirección de Email
				</label>
				<div className="mt-2">
					<input
						onChange={handleChangeInputs}
						name="correo"
						autoComplete="email"
						required
						className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Enviar Correo
				</button>
			</div>
		</form>
	);
}

export default ResetPassword;
