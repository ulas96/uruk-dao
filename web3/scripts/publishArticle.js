const hre = require("hardhat");
const { contractAddr, contractName, personalAddress } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const post = await contract.publishArticle("Uruk DAO is more advanced than ever");
    await post.wait();
    const posts = await contract.getMemberPosts(personalAddress);
    console.log(posts.map((post) => post.content))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });