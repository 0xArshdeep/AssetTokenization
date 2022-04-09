import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded:false, kycAddress:"0x123..." };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3(); 

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the MyToken contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      // Get the MyTokenSale contract instance.
      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );

      // Get the KycContract contract instance.
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contracts to the state
      this.setState({ loaded:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleKycWhitelisting = async() => {
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC for " + this.state.kycAddress + " is completed.");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contracts...</div>;
    }
    return (
      <div className="App">
        <h1>Arshdeep Token Sale</h1>
        <p>Get your Tokens today!</p>
        <h2>KYC Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleKycWhitelisting}>Add to Whitelist</button>
      </div>
    );
  }
}

export default App;
