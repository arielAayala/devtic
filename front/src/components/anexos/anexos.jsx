import React from "react";

function Anexos(props) {
	const { lstAnexos } = props;

	if (lstAnexos.length == 0) {
		return null;
	}

	return (
		<section>
			<div className=" mx-auto  ">
				<div className="grid   m-4 ">
					{lstAnexos.map((i) => {
						return (
							<div
								key={i.idAnexoDemanda || i.idAnexoNota}
								className="items-center bg-gray-50 rounded-lg py-2 flex dark:bg-gray-800  dark:border-gray-700 shadow-lg "
							>
								<a href={i.urlAnexoDemanda || i.urlAnexoNota}>
									<img
										className=" min-w-max  h-10 rounded-lg "
										src="/fileIcon.png"
									/>
								</a>
								<div>
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
