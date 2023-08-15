"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const fs = __importStar(require("fs"));
async function main() {
    //http://127.0.0.1:7545
    const provider = new ethers_1.ethers.JsonRpcProvider('http://172.17.80.1:7545');
    const wallet = new ethers_1.ethers.Wallet('0xf3dc25449d37bec4a323416285c7450d2b006d87abe7560a2abb0c5b42e31bb3', provider);
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');
    // in Ethers, a factory is just a object that you can use to deploy contracts
    const contractFactory = new ethers_1.ethers.ContractFactory(abi, binary, wallet);
    console.log('Deploying, please wait...');
    const contract = contractFactory.deploy(); // STOP here! Wait for contract to deploy!
    console.log(contract);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(0);
});
// synchronous - [solidity]
// asynchronous - [javascript]
// Synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn to finish
// 3. Pour drinks for everyone
// Asynchronous
// 1. Put popcorn in microwave
// 2. Pour drinks for everyone
// 3. Wait for popcorn to finish
// Promise
// Pending
// Fullfiled
// Rejected
// deploy a contract? Wait for it to be dployerd
// contract.deploy -> wouldn't wait for it to finish -> if is not async function
//# sourceMappingURL=deploy.js.map