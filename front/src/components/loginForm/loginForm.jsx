"use client";
import { useAuthContext } from "@/context/authContext";
import React, { useState } from "react";

function LoginForm() {
	const [inputs, setInputs] = useState();
	const { iniciarSesion } = useAuthContext();

	const handleChangeInputs = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		iniciarSesion(inputs);
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
					Correo Electronico
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
				<div className="flex items-center justify-between">
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Contraseña
					</label>
				</div>
				<div className="mt-2">
					<input
						onChange={handleChangeInputs}
						name="contrasena"
						autoComplete="current-password"
						required
						type="password"
						className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
				<div className="text-sm m-2">
					<a
						href="#"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Olvidaste tu contraseña?
					</a>
				</div>
			</div>

			<div>
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Iniciar Sesion
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
