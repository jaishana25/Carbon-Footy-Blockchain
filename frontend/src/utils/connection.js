import {ethers} from "ethers";
const connectToMetaMask = async () => {
	if (typeof window.ethereum === 'undefined') {
		throw new Error('MetaMask is not installed');
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	await window.ethereum.enable(); // Request user permission to connect
	const signer = provider.getSigner();
	const accounts = await signer.getAddress();
	return accounts[0];
};

export default connectToMetaMask;