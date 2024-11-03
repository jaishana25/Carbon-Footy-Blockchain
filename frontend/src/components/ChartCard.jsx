import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js';
import React from 'react';
import {Line} from 'react-chartjs-2';


ChartJS.register(LineElement, PointElement, CategoryScale, Legend, LinearScale, Title, Tooltip);
const ChartCard = (props) => {

		const options = {
			scales: {
				x: {
					ticks: {
						color: '#2e3918',
						font:{
							size: 10
						}// Set the x-axis label color
					},
					title: {
						display: true,
						text: 'Time',
						color: '#2e3918',
						font: {
							size: 24
						},
							// Set the x-axis title color
					}
				},
				y: {
					ticks: {
						color: '#2e3918',
					// Set the y-axis label color
					},
					title: {
						display: true,
						text: 'CO2 Emissions',
						size: '2rem',
						color: '#2e3918' ,
						font:{
							size: 24
						}// Set the y-axis title color
					}
				}
			},
			plugins: {
				legend: false,

			},
			responsive: true
		};


const keys = [...props.data.keys()];
const values = [...props.data.values()];

const data = {
	labels: keys,
	datasets: [
		{
			label: 'CO2e',
			data: values,
			fill: true,
			borderColor: '#d0fc65',
		}
	],

};


return (
	<div className="h-[31rem] w-3/5 p-8 rounded-lg bg-primary ml-6">
		<h1 className="text-secondary font-albert text-5xl">Graph</h1>
		<div className="h-[90%]"><Line options={options} data={data}/></div>

	</div>
);
}
;

export default ChartCard;