const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "C:/Users/19259/Documents/AssetTokenization/.env"});

contract("TokenSale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount]  = accounts;

    it("should not have any tokens in my deployerAccount", async() => {
        let instance = await Token.deployed();
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

});