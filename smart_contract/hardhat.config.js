
/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
}

// https://eth-sepolia.g.alchemy.com/v2/C_x2f95uRPElXsgh6urjuRD1MVoCPrgU
// C_x2f95uRPElXsgh6urjuRD1MVoCPrgU