import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function HomeLayout({ children }) {
	return (
		<div>
			<Header></Header>
			{children}
			<Footer></Footer>
		</div>
	);
}
