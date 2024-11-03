// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.7.0 <0.9.0;

contract CarbonFootprintRegistry {
    // Struct to store company data
    struct FootprintRecord {
        uint256 footprint;
        uint256 timestamp;
    }

    // Mapping to store company data by their address
    mapping(address => FootprintRecord[]) public companyFootprints;

    // Function to register a company's carbon footprint
    function submitFootprint(uint256 _footprint) public {
        // Require that the message sender provides a valid emission value
        require(_footprint > 0, "Total emission must be greater than zero");

        uint256 timestamp = block.timestamp;

        if (companyFootprints[msg.sender].length == 0) {
            companyFootprints[msg.sender].push(
                FootprintRecord(_footprint, timestamp)
            );
        } else {
            companyFootprints[msg.sender].push(
                FootprintRecord(_footprint, timestamp)
            );
        }
    }

    // Function to retrieve a company's ALL footprint records (assuming it's the calling address)
    function getFootprints() public view returns (FootprintRecord[] memory) {
        return companyFootprints[msg.sender];
    }
}
