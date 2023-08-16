import { ethers } from 'ethers';
import * as fs from 'fs';

async function main() {
    //http://127.0.0.1:7545
    const provider = new ethers.JsonRpcProvider('http://172.17.80.1:7545');
    const wallet = new ethers.Wallet(
        '0xf3dc25449d37bec4a323416285c7450d2b006d87abe7560a2abb0c5b42e31bb3',
        provider
    );
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');

    // in Ethers, a factory is just a object that you can use to deploy contracts
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log('Deploying, please wait...');

    const contract = await contractFactory.deploy({ gasPrice: 10000000000 }); // STOP here! Wait for contract to deploy!
    //console.log(contract);
    // Now we can wait a block or more to make sure that the trx will be attached to the chain
    // Transaction receipt is what you get for block confirmation
    // if you dont have the wait(), then
    const transactionReceipt = await contract.deploymentTransaction()?.wait(1);
    console.log('Deployment transaction: ');
    console.log(contract.deploymentTransaction());
    console.log('Transaction receipt: ');
    console.log(transactionReceipt);
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
