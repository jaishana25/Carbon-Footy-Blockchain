// Import necessary hooks and components
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
	// State to store the user's input address
	const [address, setAddress] = useState("");

	// Handle changes to the input field
	const handleChange = (e) => {
		setAddress(e.target.value);
	}
	console.log(address);
	const navigate = useNavigate();
	const  handleSubmit = (e) => {
		e.preventDefault();
		console.log('Submitted');
		navigate('/search', {state: address});

	}
	return (
		<nav className="flex justify-between items-center p-10 text-white font-albert cursor-pointer z-10">
			<h1 className="text-2xl font-light z-10">
				RE-STORE
			</h1>
			<ul className="flex items-center">
				{/* Navigation Links */}
				<li className="px-4">
					<Link to="/how-it-works" className="hover:text-gray-300">How it works</Link>
				</li>
				<li className="px-4">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Search"
							className="bg-transparent rounded-3xl p-2 border-2 border-primary focus:outline-none focus:border-white"
							value={address}
							onChange={handleChange}

							aria-label="Search" // Accessibility improvement
						/>
					</form>

				</li>
				<li className="px-4">
					<Link to="/get-started" className="hover:text-gray-300">Get started</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
