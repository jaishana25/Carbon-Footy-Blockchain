import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ChartCard from "../components/ChartCard.jsx";
import CompanyDetailsCard from "../components/CompanyDetailsCard.jsx";
import FootprintCard from "../components/FootprintCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { TransactionContext } from "../context/TransactionContext.jsx";


const Dashboard = () => {
	const { currentAccount } = useContext(TransactionContext);

	const [footprints, setFootprints] = useState([]);

	console.log("dash",currentAccount)

	useEffect(() => {

		const getFootprints = async () => {
			const response = await axios.get(`http://10.0.4.104:8000/apis/footprint-reports/${currentAccount}`);
			setFootprints(response.data);
		}

		if (currentAccount) {
			getFootprints();
		}
		console.log(footprints)

	}, [currentAccount]);



	const navigate = useNavigate();

	// Redirect if not logged in
	useEffect(() => {
		if (!currentAccount) {
			navigate('/');
		}
	}, [currentAccount, navigate]);

	const timestampToEmissionMap = new Map();

	for (const item of footprints) {
		const timestamp = item.timestamp;
		const totalEmission = item.total_emission;
		timestampToEmissionMap.set(timestamp, totalEmission);
	}
	console.log(timestampToEmissionMap);

	return (
		<div className="bg-[#2e3918] w-full h-[200vh]">
			<Navbar />
			<main className="flex flex-col justify-between p-10">
				<div className="flex justify-between items-start mb-10 ">
					<div className='flex flex-col'>
						<CompanyDetailsCard />
						<div>
							<Link to={'/add-footprint'}><button className='bg-secondary w-full p-4 rounded-lg my-8 text-2xl font-albert text-tertiary font-bold cursor-pointer hover:' >Add new Footprint</button></Link>
						</div>
					</div>

					<ChartCard data={timestampToEmissionMap}/>
				</div>
				<section>
					<h1 className="text-6xl text-secondary font-albert mb-10">Footprint History</h1>
					<div className="flex justify-start gap-x-12 flex-wrap">
						{
							footprints.map((footprint) => (
								<FootprintCard
									key={footprint.id}
									id={footprint.id}
									timestamp={footprint.timestamp}
									txHash={footprint.transaction_hash}
									totalEmission={footprint.total_emission}
								/>
							))
						}
					</div>
				</section>
			</main>
		</div>
	);
};

export default Dashboard;
