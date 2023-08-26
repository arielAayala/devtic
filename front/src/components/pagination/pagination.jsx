import React from "react";

function Pagination(props) {
	const { page, total, setPage, paginaNumero } = props;

	let totalDePaginas = parseInt(total / 10) + (total % 10 === 0 ? +0 : +1);

	return (
		<div className="flex flex-col items-center">
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Página
				<span className="font-semibold text-gray-900 dark:text-white px-2">
					{paginaNumero}
				</span>
				de
				<span className="font-semibold text-gray-900 dark:text-white px-2">
					{totalDePaginas.toString()}
				</span>
				de
				<span className="font-semibold text-gray-900 dark:text-white px-2">
					{total}
				</span>
				Demandas
			</span>
			<div className="inline-flex mt-2 xs:mt-0">
				<button
					onClick={() => setPage(page - 1)}
					disabled={page === 1 ? true : false}
					className=" flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<svg
						className="w-3.5 h-3.5 mr-2"
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
							d="M13 5H1m0 0 4 4M1 5l4-4"
						/>
					</svg>
					Anterior
				</button>
				<button
					onClick={() => setPage(page + 1)}
					disabled={page === totalDePaginas ? true : false}
					className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					Siguiente
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
	);
}
export default Pagination;
