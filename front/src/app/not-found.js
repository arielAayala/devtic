"use client";
import { useRouter } from "next/navigation";
import React from "react";

function NotFound() {
	const router = useRouter();

	const handleGoBack = () => {
		router.push("/demandas");
	};

	return (
		<section className="bg-center bg-no-repeat w-screen h-screen bg-[url('https://previews.123rf.com/images/sabelskaya/sabelskaya1909/sabelskaya190901053/130805752-error-404-banner-aislado-de-p%C3%A1gina-no-encontrada-gente-de-dibujos-animados-plana-con-enchufe.jpg')] bg-gray-700 bg-blend-multiply">
			<div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
					Esta pagina no existe
				</h1>

				<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
					<button
						onClick={handleGoBack}
						className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
					>
						Volver a inicio
						<svg
							className="w-3.5 h-3.5 ml-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</button>
				</div>
			</div>
		</section>
	);
}

export default NotFound;
