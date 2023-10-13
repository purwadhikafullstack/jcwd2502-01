import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import NexoLogo from "../../client/src/assets/logo/nexocomp_logo_dark.svg"

function App() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/greetings`
			);
			setMessage(data?.message || "");
		})();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={NexoLogo} className="App-logo w-[500px]" alt="logo" />
				{message}
			</header>
		</div>
	);
}

export default App;
