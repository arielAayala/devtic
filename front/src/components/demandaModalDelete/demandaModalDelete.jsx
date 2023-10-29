import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlertContext } from "@/context/alertContext";

function DemandaModalDelete({ params }) {
	const { crearAlert } = useAlertContext();

	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => setShowModal(() => !showModal);

	const handleBorrarDemanda = () => {
		fetch("http://localhost/devtic/api/EliminarDemanda.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(params),
		})
			.then((rest) => {
				if (!rest.ok) {
					throw new Error("Ocurrio un error al eliminar la demanda");
				}
				return rest.json();
			})
			.then((rest) => {
				crearAlert(rest);
				router.push("/demandas");
			})
			.catch((error) => {
				crearAlert({ error: error.message });
			});
	};

	return (
		<>
			<button
				type="button"
				onClick={handleShowModal}
				className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

				Eliminar
			</button>
			<div
				className={`fixed top-0 left-0 right-0 z-50  p-4 w-screen bg-black h-screen flex justify-center items-center bg-opacity-60  ${
					showModal ? "" : "hidden"
				}`}
			>
				<div className="relative w-max">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button
							type="button"
							onClick={handleShowModal}
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Cerrar</span>
						</button>
						<div className="p-6 text-center">
							<svg
								className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
								¿Estas seguro que quiere eliminar esta demanda?
							</h3>
							<button
								onClick={handleBorrarDemanda}
								type="button"
								className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
							>
								Si, Estoy seguro
							</button>
							<button
								onClick={handleShowModal}
								type="button"
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								No, cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DemandaModalDelete;
