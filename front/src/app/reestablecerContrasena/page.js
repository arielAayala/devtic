"use client";
import { useAuthContext } from "@/context/authContext";
import React, { useState } from "react";
import Image from "next/image";
import { useAlertContext } from "@/context/alertContext";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
	const { crearAlert } = useAlertContext();
	const router = useRouter();
	const pathname = useSearchParams().get("token");

	const [inputs, setInputs] = useState({
		contrasena: null,
		contrasenaRepetida: null,
		token: pathname,
	});

	const handleChangeInputs = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			(inputs.contrasena == inputs.contrasenaRepetida) &
			(inputs.contrasena.length >= 8) &
			(inputs.contrasenaRepetida.length >= 8)
		) {
			fetch("http://localhost/devtic/api/ReestablecerContrasena.php", {
				method: "POST",
				body: JSON.stringify(inputs),
			})
				.then(async (res) => {
					if (!res.ok) {
						throw new Error("Ocurrio un error al reestablecer la contraseña", {
							cause: await res.json(),
						});
					}
					return res.json();
				})
				.then((res) => {
					crearAlert(res);
					router.push("/");
				})
				.catch((e) => {
					const error = e.cause?.error || e.message;
					crearAlert({ error: error });
				});
		} else {
			crearAlert({
				error: "Por favor, ingrese correctamente las dos contraseñas",
			});
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between ">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-2xl w-screen rounded-2xl">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						className="mx-auto w-auto h-auto "
						onClick={() => router.push("/")}
						src={"/loginFoto.png"}
						alt="Your Company"
						width={100}
						height={100}
						priority
					/>
				</div>
				<form
					onSubmit={handleSubmit}
					className="space-y-6 "
				>
					<div>
						<label
							htmlFor="contrasena"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Contraseña Nueva
						</label>
						<div className="mt-2">
							<input
								onChange={handleChangeInputs}
								name="contrasena"
								autoComplete="contrasena"
								required
								className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="contrasenaRepetida"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Repita la Contraseña
							</label>
						</div>
						<div className="mt-2">
							<input
								onChange={handleChangeInputs}
								name="contrasenaRepetida"
								autoComplete="contrasenaRepetida"
								required
								type="contrasenaRepetida"
								className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Cambiar contraseña
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default ResetPasswordForm;
