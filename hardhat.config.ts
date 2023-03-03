import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url:process.env.GOERLI_RPC,
      // @ts-ignore
      accounts:[process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2],
    },
    hardhat: {
      forking: {
        //@ts-ignore
        url: process.env.GOERLI_RPC_MAINNET,
      }
    }
  },
  etherscan:{
    apiKey: process.env.API_KEY,
  }
};

export default config;
