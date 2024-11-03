import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScopeDetails = () => {
	const [scope, setScope] = useState({ scope1: 0, scope2: 0, scope3: 0 });
	const location = useLocation();
	const navigate = useNavigate();
	const emissionData = location.state?.emissionData;
	const [isSumCorrect, setIsSumCorrect] = useState(false);

	const calculateSum = useCallback(() => {
		return Object.values(scope).reduce((sum, num) => sum + parseFloat(num), 0);
	}, [scope]);

	const checkSum = useCallback(() => {
		const sum = calculateSum();
		console.log("Calculated Sum: ", sum);
		setIsSumCorrect(sum === emissionData?.total_emission);
		return sum === emissionData?.total_emission;
	}, [calculateSum, emissionData]);

	useEffect(() => {
		if (emissionData) {
			console.log("Received Emission Data:", emissionData);
			checkSum();
		}
	}, [checkSum, emissionData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setScope(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (checkSum()) {
			try {
				const response = await axios.post(`http://10.0.4.104:8000/apis/footprint-breakdowns/`, {
					scope1_emission: parseFloat(scope.scope1),
					scope2_emission: parseFloat(scope.scope2),
					scope3_emission: parseFloat(scope.scope3),
					footprint: emissionData.id
				});
				console.log('Breakdown posted successfully:', response.data);
				navigate('/dashboard');  // Redirect to a success page or another route as needed
			} catch (error) {
				console.error('Failed to post emission breakdown:', error);
			}
		} else {
			alert('The sum of scope emissions does not match the reported total emission.');
		}
	};

	return (
		<div className="w-screen h-screen flex bg-[#2e3918]">
			<div className="w-1/2 p-10 flex flex-col justify-center">
				<h1 className="text-secondary text-6xl font-bold mb-10">Emissions Breakdown</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					{Object.entries(scope).map(([key, value]) => (
						<div key={key} className="flex flex-col">
							<label htmlFor={key} className="text-secondary text-2xl capitalize">{`${key.replace('scope', 'Scope ')} Emissions`}</label>
							<input
								type="number"
								id={key}
								name={key}
								value={value}
								onChange={handleChange}
								className="mt-2 p-2 w-full rounded-lg bg-transparent text-white text-xl border-2 border-secondary focus:border-blue-500 focus:outline-none"
								placeholder={`Enter ${key.replace('scope', 'Scope ')}`}
								step="100"
							/>
						</div>
					))}
					<button type="submit" className="mt-4 bg-secondary text-black text-2xl w-full p-2 rounded-lg hover:bg-blue-800 transition duration-300" >
						Submit
					</button>
				</form>
			</div>
			<div className="w-1/2 bg-cover bg-center text-white text-xl font-bold" style={{ backgroundImage: "url('https://i.pinimg.com/736x/39/9d/16/399d165bf0669a1ada5966b7391d14aa.jpg')" }}>
				<div className="flex h-full items-center justify-center">
					<p className="bg-opacity-50 bg-black p-4 rounded-lg">Total Emissions: {emissionData?.total_emission} units</p>
				</div>
			</div>
		</div>
	); ˀ
};

export default ScopeDetails;
