"use client";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useAuthContext } from "@/context/authContext";
import { redirect } from "next/navigation";

export default function HomeLayout({ children }) {
	const { user } = useAuthContext();

	if (!user) {
		redirect("/");
	}

	return (
		<div>
			<Header></Header>
			{children}
			<Footer></Footer>
		</div>
	);
}
