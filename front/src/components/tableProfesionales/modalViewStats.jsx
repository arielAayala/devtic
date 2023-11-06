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
			<button 
			type="button"
			onClick={handleModal}> 
			<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h12M8 5h5M8 9h5M1 13h12M4 5v4L1 7l3-2Z"/>
  			</svg> Ver
			</button>
			{modal ? (
				<div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-screen h-screen p-4 bg-gray-700 bg-opacity-60">
					<div className="relative w-full max-w-2xl max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Estadisticas Personales
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
							<div className="p-10">
							<h2 className="flex flex-row flex-nowrap items-center">
								<span className="flex-grow block border-t border-black"></span>
								<span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
									Ultimos 30 días
								</span>
								<span class="flex-grow block border-t border-black"></span>
							</h2>
							<div className="flex flex-row flex-wrap mt-10">
								<div className="flex flex-row items-center my-2 mr-4 bg-gray-100 rounded py-1 px-2">
									<div className="mt-1 fill-current">
									<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 8v4m0 0-2-2m2 2 2-2M3 5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H3ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
									</svg>  
						
						
									</div>
									<div className="text-center pl-2">
										<span className="">{demandasIngresadas} Demandas Ingresadas </span>
									</div>
								</div>
								<div className="flex flex-row items-center my-2 mr-4 bg-gray-100 rounded py-1 px-2">
									<div className="mt-1 fill-current">
									<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.994 19a8.999 8.999 0 1 1 3.53-17.281M5.995 9l4 4 7-8m-1 8v5m-2.5-2.5h5"/>
									</svg>  
						
									</div>
									<div className="text-center pl-2">
										<span className="">{notasIngresadas} Notas Ingresadas </span>
									</div>
								</div>
								<div className="flex flex-row items-center my-2 mr-4 bg-gray-100 rounded py-1 px-2">
									<div className="mt-1 fill-current">
									<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
									</svg> 
									</div>
									<div className="text-center pl-2">
										<span className="">{demandasEnCurso} Demandas en Curso </span>
									</div>
								</div>
								<div className="flex flex-row items-center my-2 mr-4 bg-gray-100 rounded py-1 px-2">
									<div className="mt-1 fill-current">
									<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
									</svg>
						
									</div>
									<div className="text-center pl-2">
										<span className="">{demandasTerminadas} Demandas Terminadas</span>
									</div>
								</div>
								<div className="flex flex-row items-center my-2 mr-4 bg-gray-100 rounded py-1 px-2">
									<div className="mt-1 fill-current">
									<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 1H1m14 18H1m2 0v-4.333a2 2 0 0 1 .4-1.2L5.55 10.6a1 1 0 0 0 0-1.2L3.4 6.533a2 2 0 0 1-.4-1.2V1h10v4.333a2 2 0 0 1-.4 1.2L10.45 9.4a1 1 0 0 0 0 1.2l2.15 2.867a2 2 0 0 1 .4 1.2V19H3Z"/>
									</svg>
									</div>
									<div className="text-center pl-2">
										<span className="">{demandasDemoradas} Demandas Demoradas </span>
									</div>
								</div>
								<div className="flex flex-row items-center my-2 mr-4 bg-gray-100 rounded py-1 px-2">
									<div className="mt-1 fill-current">
									<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v6m4-6v6m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
									</svg>
									</div>
									<div className="text-center pl-2">
										<span className="">{demandasPendientes} Demandas Pendientes </span>
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</td>
	);
}

export default ModalViewStats;
