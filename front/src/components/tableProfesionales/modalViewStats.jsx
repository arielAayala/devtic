import React, { useState } from "react";

function ModalViewStats(props) {
	const {
		demandasEnCurso,
		demandasDemoradas,
		demandasIngresadas,
		demandasPendientes,
		demandasTerminadas,
		notasIngresadas,
	} = props;

	const [modal, setModal] = useState(false);

	const handleModal = () => {
		setModal(!modal);
	};

	return (
		<td>
			<button onClick={handleModal}>Ver detalles </button>
			{modal ? (
				<div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-screen h-screen p-4 bg-gray-700 bg-opacity-60">
					<div className="relative w-full max-w-2xl max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Estadisticas
								</h3>
								<button
									type="button"
									onClick={handleModal}
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-hide="default-modal"
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
							</div>

							<div className="p-6 space-y-6">
								<p>
									demandasEnCurso: {demandasEnCurso}, demandasDemoradas{" "}
									{demandasDemoradas}, demandasIngresadas {demandasIngresadas},
									demandasPendientes {demandasPendientes}, demandasTerminadas{" "}
									{demandasTerminadas}, notasIngresadas {notasIngresadas},
								</p>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</td>
	);
}

export default ModalViewStats;
