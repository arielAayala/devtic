"use client";
import { useAuthContext } from "@/context/authContext";
import LoginForm from "../components/loginForm/loginForm";
import { redirect } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import ResetPassword from "@/components/resetPassword/resetPassword";

export default function LoginPage() {
	const { user } = useAuthContext();

	const [resetPassword, setResetPassword] = useState(false);

	if (user) {
		redirect("/demandas");
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between ">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-2xl w-screen rounded-2xl">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Image
						className="mx-auto w-auto h-auto "
						onClick={() => setResetPassword(false)}
						src={"/loginFoto.png"}
						alt="Your Company"
						width={100}
						height={100}
						priority
					/>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
					{resetPassword ? (
						<ResetPassword />
					) : (
						<LoginForm setResetPassword={setResetPassword} />
					)}
				</div>
			</div>
		</main>
	);
}
