import { ethers } from 'ethers';

async function main() {
    //http://127.0.0.1:7545
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
    const wallet = new ethers.Wallet(
        '0xd795ad6e65eb3ef6f97bf359b641228b916e0eeaa2ff4091e22cfe05450664b2',
        provider
    );
}

main().then(() =>
    proccess.exit(0).catch((error) => {
        console.log(error);
        proccess.exit(1);
    })
);
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
