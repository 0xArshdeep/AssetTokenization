const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({path: "C:/Users/19259/Documents/AssetTokenization/.env"});
const AccountIndex = 1;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*" // match any network
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*" // match any network
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountIndex);
      },
      network_id: 5777
    }
  },
  compilers: {
    solc: {
      version:"0.8.13",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
