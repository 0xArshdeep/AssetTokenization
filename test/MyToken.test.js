const Token = artifacts.require("MyToken");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "C:/Users/19259/Documents/AssetTokenization/.env"});

contract("Token Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount]  = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS)
    });
    
    it("All tokens should be in my account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same.");

        //expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);

        // Cleaner way using chai-as-promised 
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is not possible to send more tokens than available in total", async() => {
        let instance = this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        await expect(instance.transfer(recipient,new BN(balanceOfDeployer+1))).to.eventually.be.rejected;

        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });

    it("is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equals(totalSupply.sub(new BN(sendTokens)));
        return await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equals(new BN(sendTokens));
    });

});