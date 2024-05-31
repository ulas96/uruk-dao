const hre = require("hardhat");
const { contractAddr, contractName } = require("../scripts/constants");
const {bondHash, readHashBond} = require("proof-of-string");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);
    const article = await contract.getArticle(1);
    const string = await readHashBond(article.content);
    console.log(string)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });