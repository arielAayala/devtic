import React from "react";
import SearchForm from "@/components/searchForm/searchForm";
import Categories from "@/components/categories/categories";
import Pagination from "@/components/pagination/pagination";

function DemandaPage() {
	return (
		<div className="space-y-4">
			<SearchForm></SearchForm>
			<Categories></Categories>
			<Pagination></Pagination>
		</div>
	);
}
export default DemandaPage;
