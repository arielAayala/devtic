"use client";
import { useAuthContext } from "@/context/authContext";
import React, { useState } from "react";

function Categories() {
	return (
		<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
			<li className="mr-2">
				<a
					href="#"
					className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active"
					aria-current="page"
				>
					Participo
				</a>
			</li>
			<li className="mr-2">
				<a
					href="#"
					className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
				>
					No Participo
				</a>
			</li>
			<li className="mr-2">
				<a
					href="#"
					className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
				>
					Todos
				</a>
			</li>
		</ul>
	);
}
export default Categories;
