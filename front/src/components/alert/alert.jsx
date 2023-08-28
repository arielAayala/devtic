"use client";

import { useAlertContext } from "@/context/alertContext";
import React, { useEffect } from "react";

function Alert() {
	const { alert, cerrarAlert } = useAlertContext();

	useEffect(() => {
		setTimeout(() => {
			cerrarAlert();
		}, 3500);
	}, []);

	if (alert) {
		return (
			<div
				className={
					" bg-blue-400 opacity-85 flex flex-row  right-12 bottom-12 p-2 rounded-full fixed"
				}
			>
				<button
					className=" text-white text-center border border-white  rounded-full w-7 h-7 "
					onClick={() => cerrarAlert()}
				>
					X
				</button>
				<h3 className=" text-white text-center px-4">
					{alert.msg ?? alert.error}
				</h3>
			</div>
		);
	}

	return null;
}

export default Alert;
