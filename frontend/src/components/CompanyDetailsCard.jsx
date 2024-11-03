import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import { TransactionContext } from "../context/TransactionContext.jsx";

const CompanyDetailsCard = (props) => {
	const [companyDetails, setCompanyDetails] = useState({
		name: "",
		walletAddress: "",
		industry: "",
		website: ""
	});

	let currentAccount;
	// let { currentAccount } = useContext(TransactionContext);

	if(props.walletAddress!==undefined){
		currentAccount=props.walletAddress.toLowerCase();
	}else{
		currentAccount = useContext(TransactionContext).currentAccount;

	}


	useEffect(() => {
		const fetchCompany = async () => {
			try {
				if(props.walletAddress!==undefined){
					console.log('props',props.walletAddress);
					const { data } = await axios.get(`http://10.0.4.104:8000/apis/companies/details/${props.walletAddress}`);
					console.log(data);  // It's good to log data for debugging, can be removed in production
					const { company, industry_sector } = data;
					setCompanyDetails({
						name: company.name,
						walletAddress: company.wallet_address,
						industry: industry_sector.name,
						website: company.website
					});
				}
				const { data } = await axios.get(`http://10.0.4.104:8000/apis/companies/details/${currentAccount}`);
				console.log(data);  // It's good to log data for debugging, can be removed in production
				const { company, industry_sector } = data;
				setCompanyDetails({
					name: company.name,
					walletAddress: company.wallet_address,
					industry: industry_sector.name,
					website: company.website
				});
			} catch (error) {
				console.error("Failed to fetch company details:", error);
			}
		};

		if (currentAccount) {
			fetchCompany();
		}
	}, [currentAccount]);  // Make sure to include currentAccount in the dependency array

	return (

		<div className="bg-primary w-full font-albert flex flex-col justify-normal p-8 rounded-lg h-[25rem]">
			<h1 className="text-secondary font-bold text-7xl my-6">{companyDetails.name}</h1>
			<p className="text-secondary text-2xl mt-2 w-full overflow-x-auto whitespace-nowrap">{companyDetails.walletAddress}</p>
			<a href={companyDetails.website.startsWith('http') ? companyDetails.website : `http://${companyDetails.website}`}
				target="_blank" rel="noopener noreferrer" className="text-white my-4 text-2xl">Website: <span className=" text-2 font-bold  hover:text-secondary">{companyDetails.website} </span>

			</a>
			<p className="text-white text-3xl font-bold mt-2">{companyDetails.industry}</p>

		</div>


	);
};

export default CompanyDetailsCard;
