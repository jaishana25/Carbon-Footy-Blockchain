import React from 'react';
import { useNavigate } from "react-router-dom";


const FootprintCard = (props) => {

	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/breakdown', { state: props });
	}
	let date = new Date(props.timestamp);
	// Extracting the date parts
	let year = date.getFullYear();
	let month = date.getMonth() + 1; // getMonth() returns 0-11
	let day = date.getDate();

	// Formatting the date as YYYY-MM-DD
	let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
	return (
		<div className="bg-primary w-fit flex flex-col items-start p-4 justify-center h-40 rounded-lg my-8 mx-4 cursor-pointer" >
			<p className={" font-albert text-3xl font-bold text-secondary"} onClick={handleClick}><span className='text-5xl'>{props.totalEmission}</span> CO2e</p>
			<h1 className="text-white font-albert">{props.timestamp}</h1>

			<a href={`https://sepolia.etherscan.io/tx/${props.txHash}`} target="_blank" rel="noopener noreferrer" className='text-secondary text-xl'>Transaction 🔗</a>
		</div>
	);
};

export default FootprintCard;