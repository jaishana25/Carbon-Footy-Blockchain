import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from '../assets/background.jpg';
import Navbar from "../components/Navbar.jsx";
import { TransactionContext } from "../context/TransactionContext.jsx";

const Input = ({ placeholder, name, type, value, handleChange }) => (
	<input
		placeholder={placeholder}
		type={type}
		step="100"
		value={value}
		onChange={(e) => handleChange(e, name)}
		className="my-4 w-full rounded-lg p-2 outline-none text-black border-none text-xl white-glassmorphism"
	/>
);

const Started = () => {
	const navigate = useNavigate();
	const [emission, setEmission] = useState(0);
	const handleChange = (e) => {
		setEmission(e.target.value);
	}

	const { currentAccount, registerEmission } = useContext(TransactionContext);
	const [companyDetails, setCompanyDetails] = useState({
		name: "",
		walletAddress: currentAccount,
		industry: "",
		website: "",
		id: 0
	});

	useEffect(() => {
		const getCompanyDetails = async () => {
			if (!currentAccount) return;
			try {

				const response = await axios.get(`http://10.0.4.104:8000/apis/companies/details/${currentAccount}/`);
				const { company, industry_sector } = response.data;
				setCompanyDetails({
					name: company.name,
					walletAddress: company.wallet_address,
					industry: industry_sector.name,
					website: company.website,
					id: parseInt(company.id, 10),
				});
			} catch (error) {
				console.error("Failed to fetch company details:", error);
			}
		};

		getCompanyDetails();
	}, [currentAccount]);

	const postEmission = async (e) => {
		e.preventDefault();
		try {
			const txHash = await registerEmission(parseInt(emission))
			console.log("The transaction hash is " + txHash);
			const response = await axios.post('http://10.0.4.104:8000/apis/footprint-reports/', {
				company: companyDetails.id,
				total_emission: parseFloat(emission),
				transaction_hash: txHash,
			});
			console.log('Emission posted successfully:', response.data);
			// Passing response data to the /scopeDetails route
			navigate('/scopeDetails', { state: { emissionData: response.data } });
		} catch (error) {
			console.error('Failed to post emission:', error);
		}
	}

	return (
		<div className="bg-[#2e3918] w-screen h-screen">
			<Navbar />
			<div className="bg-hero-image">
				<img alt="hero" src={background} className="w-6/12 h-screen absolute top-0 z-0" />
			</div>
			<div className="absolute w-1/2 mt-10 right-0">
				<div className="p-5 w-[30rem] flex flex-col justify-center items-center blue-glassmorphism">
					<form onSubmit={postEmission}>
						<h1 className="text-8xl font-semibold text-secondary mt-10 mb-2 font-albert">{companyDetails.name}</h1>
						<h2 className="text-xl text-secondary mb-10 font-albert">{companyDetails.industry}</h2>
						<label className="text-secondary my-10">Total CO2e emissions</label>
						<Input placeholder="Total Emission (CO2e)" name="emission" type="number" handleChange={handleChange} />
						<button type="submit" className="bg-secondary px-8 w-full py-2 rounded-lg">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Started;
