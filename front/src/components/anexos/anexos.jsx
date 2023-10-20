import React from "react";

function Anexos(props) {
	const { lstAnexos } = props;

	if (lstAnexos.length == 0) {
		return null;
	}

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto  ">
				<div className="grid gap-4 grid-cols-2  mb-6 ">
					{lstAnexos.map((i) => {
						return (
							<div
								key={i.idAnexoDemanda || i.idAnexoNota}
								className="items-center bg-gray-50 rounded-lg shadow flex dark:bg-gray-800  dark:border-gray-700 "
							>
								<a href={i.urlAnexoDemanda || i.urlAnexoNota}>
									<img
										className=" min-w-max  h-10 rounded-lg "
										src="/fileIcon.png"
									/>
								</a>
								<div className="p-5 ">
									<h3 className="text-sm font-bold  text-gray-900 dark:text-white ">
										<a
											href={i.urlAnexoDemanda || i.urlAnexoNota}
											target="_blank"
										>
											{i.nombreAnexoDemanda || i.nombreAnexoNota}
										</a>
									</h3>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Anexos;
