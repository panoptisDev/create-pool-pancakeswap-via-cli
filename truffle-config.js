require('dotenv').config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

/*
yarn add dotenv
yarn add @truffle/hdwallet-provider
yarn add truffle-plugin-verify
truffle migrate --network bsctestnet
truffle run verify LakeVault@0x1e4463DF650164f94faFfD9fb7aD396EC55745e1 --network bsctestnet
truffle run verify VaultOwner@0xADdc1AB74B9E80E386bD3Dcd71e73943077FcdF0 --network bsctestnet
*/

module.exports = {
  contracts_build_directory: "./build/truffle",
  networks: {
    bsctestnet: {
      network_id: 97,
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
         "https://data-seed-prebsc-1-s1.binance.org:8545/"
      ),
      confirmations: 5,
      timeoutBlocks: 20000,
      skipDryRun: true,

    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    bscscan: process.env.BSCSCAN_API_KEY,
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 900
       },
     //  evmVersion: "istanbul"
      }
    },
  },
  contracts_directory: "./contracts",


};
