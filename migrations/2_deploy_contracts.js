var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
var MyKycContract = artifacts.require("KycContract");

require("dotenv").config({path: "C:/Users/19259/Documents/AssetTokenization/.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(MyKycContract);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, MyKycContract.address);
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
}