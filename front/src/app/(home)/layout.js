"use client";
import Header from "../../components/header/header";
import { useAuthContext } from "@/context/authContext";
import { redirect } from "next/navigation";
import Aside from "@/components/aside/aside";
import Loader from "@/components/loader/loader";

export default function HomeLayout({ children }) {
	const { user } = useAuthContext();

	if (!user) {
		redirect("/");
	}

	return (
		<Loader>
			<Header />
			<Aside />
			<div className="p-4 sm:ml-64">
				<div className=" p-4  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
					{children}
				</div>
			</div>
		</Loader>
	);
}
