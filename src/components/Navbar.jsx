import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()


	return (
		<nav className="navbar navbar-light bg-success">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<h1>My Contacts</h1>
				<div className="ml-auto">
					<Link to="/submit">
						<button 
						className="bg-info-subtle"
						>
							Add New Contact
							</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};