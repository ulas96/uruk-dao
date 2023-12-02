const hre = require("hardhat");
const { contractAddr, contractName } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const membersStart = await contract.getMembers();
    console.log(membersStart.length);

    const addMemberTx = await contract.becomeMember("apoxy");
    await addMemberTx.wait();
    const membersEnd = await contract.getMembers();
    console.log(membersEnd.length);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });