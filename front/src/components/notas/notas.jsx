import React from "react";
import Anexos from "../anexos/anexos";

function Notas(props) {
	const { lstNotas } = props;

	if (lstNotas.length == 0) {
		return null;
	}

	return (
		<section className=" py-8  antialiased">
			<div className="max-w-2xl mx-auto px-4">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
						Notas ({lstNotas.length})
					</h2>
				</div>
				{lstNotas.map((i) => {
					return (
						<article
							key={i.idNota}
							className="px-4 py-2 my-4 text-base bg-white rounded-lg dark:bg-gray-900 shadow-2xl"
						>
							<footer className="flex justify-between items-center mb-2">
								<div className="flex items-center">
									<p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
										<img
											className="mr-2 w-6 h-6 rounded-full"
											src={i.fotoProfesional}
											alt="Michael Gough"
										/>
										{i.nombrePersona}
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{i.fechaCreacionNota}
									</p>
								</div>
							</footer>
							<h3>{i.tituloNota}</h3>
							<h4>{i.nombreTipoNota}</h4>
							<p className="text-gray-500 dark:text-gray-400">
								{i.descripcionNota}
							</p>
							<Anexos lstAnexos={i.anexosNota} />
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default Notas;
