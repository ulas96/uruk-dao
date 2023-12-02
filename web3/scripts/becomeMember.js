const hre = require("hardhat");
const { contractAddr, contractName } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const membersStart = await contract.getMemberCount();
    console.log(membersStart);

    const addMemberTx = await contract.becomeMember();
    await addMemberTx.wait();
    const membersEnd = await contract.getMemberCount();
    console.log(membersEnd);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });