const hre = require("hardhat");
const { contractAddr, contractName } = require("../scripts/constants");
const {personalAddress} = require("./constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const commentTx = await contract.addComment(personalAddress,1,"Nice to hear!");
    await commentTx.wait();

    const posts = await contract.getMemberPosts(personalAddress);

    console.log(posts[0].comments);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });