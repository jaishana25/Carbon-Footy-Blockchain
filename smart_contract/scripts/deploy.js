const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the deployer:", deployer.address);

    const CarbonFootprint = await ethers.getContractFactory("CarbonFootprintRegistry");
    const carbonFootprints = await CarbonFootprint.deploy();

    console.log("CarbonFootprint contract deployed to:", await carbonFootprints.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });


// 0x1e4a76D2F07D48287ed6cFbA2eDCF877f92adF52 = contract address