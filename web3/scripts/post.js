const hre = require("hardhat");
const { contractAddr, contractName, personalAddress } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const post = await contract.post("I feel good today");
    await post.wait();
    const posts = await contract.getMemberPosts(personalAddress);
    console.log(posts);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });