const hre = require("hardhat");
const { contractAddr, contractName,personalAddress } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const member= await contract.getMember(personalAddress);

    console.log(member.nickname);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });