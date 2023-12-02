const hre = require("hardhat");
const { contractAddr, contractName } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const post = await contract.post("I feel good today");
    await post.wait();

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });