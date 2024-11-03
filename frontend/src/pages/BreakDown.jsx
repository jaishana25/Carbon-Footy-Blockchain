import React, {useEffect, useState} from 'react';
import BreakDownCard from "../components/BreakDownCard.jsx";
import {useLocation} from 'react-router-dom';
import axios from "axios";

const BreakDown = () => {
	const {state: props} = useLocation();  // Destructure id directly from location.state
	const [scope, setScope] = useState();

	useEffect(() => {
		const fetchBreakdown = async () => {
			try {
				const response = await axios.get(`http://10.0.4.104:8000/apis/footprint-breakdowns/${props.id}`);
				console.log('Breakdown fetched successfully:', response.data);
				setScope(response.data);
				console.log(scope)
			} catch (error) {
				console.error('Failed to fetch emission breakdown:', error);
			}
		};

		fetchBreakdown();

	}, [props.id]);  // Only rerun effect if id changes

	console.log(scope);
	return (
		<div className="bg-[#2e3918] w-screen h-screen flex justify-between items-center px-10">
			<h1 className="text-secondary text-[6rem] font-albert font-medium">Breakdown</h1>
			<div className="flex flex-col px-40">
				{scope ? (
					<>
						<BreakDownCard
							value={parseFloat(scope[0].scope1_emission / props.totalEmission * 100).toFixed(1)}
							description={
								"Scope 1 emissions are “direct emissions” from sources that are owned or controlled by the company. This can include emissions from:"}
						/>
						<hr className="w-full border-black"/>
						<BreakDownCard
							value={parseFloat(scope[0].scope2_emission / props.totalEmission * 100).toFixed(1)}
							description={
								"Scope 2 emissions are indirect emissions from the generation of purchased electricity, steam, heating and cooling consumed by the reporting company."}
						/>
						<hr className="w-full border-black"/>
						<BreakDownCard
							value={parseFloat(scope[0].scope3_emission / props.totalEmission * 100).toFixed(1)}
							description={
								"Scope 3 emissions include all other indirect emissions that occur in a company’s value chain, including both upstream and downstream emissions."}
						/>
					</>
				) : (
					<p>Loading emission data...</p>
				)}
			</div>
		</div>
	);
};

export default BreakDown;
