import Estadisticas from "@/components/estadisticas/estadisticas";
import TableProfesionales from "@/components/tableProfesionales/tableProfesionales";
import React from "react";

function AdministradorPage() {
	return (
		<>
			<Estadisticas />
			<TableProfesionales />;
		</>
	);
}

export default AdministradorPage;
