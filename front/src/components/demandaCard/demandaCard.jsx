function DemandaCard(props) {
	const { motivoDemanda, tituloDemanda, idEstado } = props;

	return (
		<div className="flex items-center justify-between w-full">
			<div>
				<div className=" w-max h-5 px-3 bg-gray-300 rounded-full dark:bg-gray-600  mb-2.5">
					<h3>{tituloDemanda}</h3>
				</div>
				<p className="  h-5 px-3 bg-gray-200 rounded-full dark:bg-gray-700   truncate max-w-xs  mx-auto ">
					{motivoDemanda}
				</p>
			</div>
			<div className="  w-12 text-center bg-gray-300 rounded-full dark:bg-gray-700 ">
				{idEstado}
			</div>
		</div>
	);
}
export default DemandaCard;
