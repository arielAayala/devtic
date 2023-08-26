import React from "react";
import SearchForm from "@/components/searchForm/searchForm";
import Categories from "@/components/categories/categories";
import Pagination from "@/components/pagination/pagination";
import Demandas from "@/components/demandas/demandas";

function DemandaPage() {
	return (
		<div className="space-y-4">
			<SearchForm></SearchForm>
			<Demandas></Demandas>
			<Pagination></Pagination>
		</div>
	);
}
export default DemandaPage;
