// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
  // Get the list of accounts
  const accounts = await ethers.getSigners();
  
  // Log the address of the first account
  console.log("Address of the first account:", accounts[0].address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});