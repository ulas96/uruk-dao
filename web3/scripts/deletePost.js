const hre = require("hardhat");
const { contractAddr, contractName,personalAddress } = require("../scripts/constants");

async function main() {

    const contract = await hre.ethers.getContractAt(contractName, contractAddr);

    const memberPostsStart = await contract.getMemberPosts(personalAddress);

    console.log(memberPostsStart.length);

    const postTx = await contract.post("I love this thing");
    await postTx.wait();

    const memberPostsMiddle = await contract.getMemberPosts(personalAddress);

    console.log(memberPostsMiddle.length);

    const deletePostTx = await contract.deletePost(memberPostsMiddle.length - 1);
    await deletePostTx.wait();


    const memberPostsEnd = await contract.getMemberPosts(personalAddress);


    console.log(memberPostsEnd.length);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });