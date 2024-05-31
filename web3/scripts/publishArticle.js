const hre = require("hardhat");
const { contractAddr, contractName, personalAddress } = require("../scripts/constants");
const {bondHash, readHashBond} = require("proof-of-string");

async function main() {
    const contract = await hre.ethers.getContractAt(contractName, contractAddr);
    const hash = await bondHash("Uruk DAO is more advanced than ever");
    const publishArticleTx = await contract.publishArticle(hash);
    await publishArticleTx.wait();
    const article = await contract.getArticle(1);
    const string = await readHashBond(article.content);
    console.log(string)
};

main();