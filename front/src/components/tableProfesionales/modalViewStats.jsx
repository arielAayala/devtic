import React from "react";

function ModalViewStats() {
	const [modal, setModal] = useState(false);

	const handleModal = () => {
		setModal(!modal);
	};

	return (
		<td>
			<button onClick={handleModal}>Ver detalles </button>
		</td>
	);
}

export default ModalViewStats;
