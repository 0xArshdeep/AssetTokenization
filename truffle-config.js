const path = require("path");

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
    ganachenet: {
      host: "localhost",
      port: 7545,
      network_id: "*" // match any network
    },
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  }
};
