import Loader from "@/components/loader/loader";
import "./globals.css";
import { AuthContextProvider } from "@/context/authContext";
import { AlertContextProvider } from "@/context/alertContext";
import Alert from "@/components/alert/alert";
export const metadata = {
	title: "Devtic",
	description: "Devtic",
};
import "flowbite";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<AlertContextProvider>
					<AuthContextProvider>
						{children}
						<Alert />
					</AuthContextProvider>
				</AlertContextProvider>
			</body>
		</html>
	);
}
