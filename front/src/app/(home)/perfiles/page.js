import React from "react";

function Colegas() {
	return (
		<>
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
						src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
						alt="perfil"
					/>
				</div>
				<div className="text-center mt-2">
					<h2 className="font-semibold">Nombre Apellido</h2>
					<p className="text-gray-500">Especialidad</p>
				</div>
				<ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
					<li className="flex flex-col items-center justify-around">
						<svg
							className="w-4 fill-current text-blue-900"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
						</svg>
						<div>cant.notas</div>
					</li>
					<li className="flex flex-col items-center justify-between">
						<svg
							className="w-4 fill-current text-blue-900"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
						</svg>
						<div>cant.deGrupos</div>
					</li>
					<li className="flex flex-col items-center justify-around">
						<svg
							className="w-4 fill-current text-blue-900"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
						</svg>
						<div>cant.demandascompletadas</div>
					</li>
				</ul>
				<div className="p-4 border-t mx-8 mt-2">
					<button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
						Ver Perfil
					</button>
				</div>
			</div>
			<div className="mt-12">
				<div className="container mx-auto px-4">
					<nav
						className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
						aria-label="Pagination"
					>
						<a
							className="flex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
							href="#"
							title="Previous Page"
						>
							<span className="sr-only">Previous Page</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="block w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</a>
						<a
							className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
							href="#"
							title="Page 1"
						>
							1
						</a>
						<a
							className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
							href="#"
							title="Page 2"
						>
							2
						</a>
						<a
							className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-black dark:border-white dark:bg-black dark:text-white pointer-events-none"
							href="#"
							aria-current="page"
							title="Page 3"
						>
							3
						</a>
						<a
							className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
							href="#"
							title="Page 4"
						>
							4
						</a>
						<a
							className="hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
							href="#"
							title="Page 5"
						>
							5
						</a>
						<a
							className="flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
							href="#"
							title="Next Page"
						>
							<span className="sr-only">Next Page</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="block w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</a>
					</nav>
				</div>
			</div>
		</>
	);
}

export default Colegas;
