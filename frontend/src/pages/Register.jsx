import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from "../assets/background.jpg";
import {TransactionContext} from "../context/TransactionContext.jsx";

const Register = () => {
	const {connectWallet,currentAccount}=useContext(TransactionContext);
	console.log("Current Account=",currentAccount);

	const [formData, setFormData] = useState({
		walletAddress: currentAccount,  // Pre-filled as it's disabled
		name: "",
		website: "",
		industry:0,
	});
	const [industries, setIndustries] = useState([]);  // State to hold the industry data
	const navigate = useNavigate(); // Hook for navigation
	useEffect(() => {
		const fetchIndustries = async () => {
			try {
				const response = await axios.get('http://10.0.4.104:8000/apis/industry-sectors/');
				setIndustries(response.data);
				console.log("Industries fetched:", response.data);
			} catch (error) {
				console.error("Failed to fetch industries:", error);
				// Handle errors here (e.g., display an error message)
			}
		};
		fetchIndustries();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log("Setting form data:", name, value);
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const selectChange=(e)=>{
		console.log(e.target.value)
		setFormData(prevData => ({
			...prevData,
			industry: e.target.value
		}));

	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting form data:", formData);
		try {
			console.log(industries)
			console.log(formData.industry)
			const response = await axios.post('http://10.0.4.104:8000/apis/companies/', {
				name: formData.name,
				wallet_address: formData.walletAddress,
				website: formData.website,
				industry: parseInt(formData.industry)
			});

			console.log("Response:", response.data);
			navigate('/dashboard'); // Navigate to the dashboard after successful registration
		} catch (error) {
			console.error("Error posting data:", error);
			// Optionally handle errors, such as by showing an error message
		}
	};

	return (
		<div className="bg-[#2e3918] h-screen">
			<div className="bg-hero-image flex">
				<img alt="hero" src={background} className="w-6/12 h-screen"/>
				<div>
					<h1 className="text-6xl pt-40 font-albert text-secondary font-bold my-10 mx-16">Company</h1>
					<form className="w-full" onSubmit={handleSubmit}>
						<div className="flex flex-col w-full ml-16">
							{Object.entries(formData).map(([key, value]) => (
								<React.Fragment key={key}>
									{key !== "industry" ? (
										<React.Fragment>
											<label className={`font-semibold text-lg text-gray-100 ${key !== 'walletAddress' ? 'mt-6' : ''}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
											<input
												type="text"
												name={key}
												value={value}
												onChange={handleChange}
												disabled={key === "walletAddress"}
												placeholder={key === "walletAddress" ? value : ""}
												className="mt-4 w-full rounded-md px-4 py-2 outline-none bg-transparent text-white border border-gray-600 text-xl white-glassmorphism"
											/>
										</React.Fragment>
									) : (
										<React.Fragment>
											<label className="font-semibold text-lg text-gray-100 mt-6">Industry</label>
											<select
												name="industry"
												value={value}
												onChange={selectChange}
												className="mt-4 w-full rounded-md px-4 py-2 outline-none bg-transparent text-white border border-gray-600 text-xl white-glassmorphism"
											>
												<option value="">Select Industry</option>
												{industries.map(industry => (
													<option key={industry.id} value={industry.id}>{industry.name}</option>
												))}
											</select>
										</React.Fragment>
									)}
								</React.Fragment>
							))}
							<button
								type="submit"
								className="mt-6 w-full rounded-full border border-green-900 bg-transparent py-2 text-white hover:bg-secondary hover:text-white transition duration-300 ease-in-out cursor-pointer"
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
