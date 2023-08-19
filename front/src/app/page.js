"use client";
import { useAuthContext } from "@/context/authContext";
import LoginForm from "../components/loginForm/loginForm";
import { redirect } from "next/navigation";

export default function LoginPage() {
	const { user } = useAuthContext();

	if (user) {
		redirect("/home");
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-2xl rounded-2xl">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						S.e.T.I.C
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
					<LoginForm></LoginForm>
				</div>
			</div>
		</main>
	);
}
