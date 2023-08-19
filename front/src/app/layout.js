import Loader from "@/components/loader/loader";
import "./globals.css";
import { AuthContextProvider } from "@/context/authContext";

export const metadata = {
	title: "Create Next App",
	description: "Devtic",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<AuthContextProvider>
					<Loader>{children}</Loader>
				</AuthContextProvider>
			</body>
		</html>
	);
}
