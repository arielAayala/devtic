"use client";
import Header from "@/components/header/header";
import { useAuthContext } from "@/context/authContext";
import { redirect } from "next/navigation";
import Aside from "@/components/aside/aside";

export default function AdministradorLayout({ children }) {
	const { user } = useAuthContext();

	if (!user || user?.prioridadProfesional == 0) {
		redirect("/demandas");
	}

	return <>{children}</>;
}
