const hre = require("hardhat");
const { contractAddr, contractName,personalAddress } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);


    const posts = await contract.getMemberArticles(personalAddress);
    console.log(posts.map((post) => post.content))

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });