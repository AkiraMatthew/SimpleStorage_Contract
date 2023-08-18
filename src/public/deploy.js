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
require("dotenv/config");
async function main() {
    //http://127.0.0.1:7545
    // To work with WSL2 and avoid future issues, we're going to work with Ganache CLI on Ubuntu20-04 linux terminal
    console.log(process.env.PRIVATE_KEY);
    console.log(process.env.RPC_URL);
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const encryptedJson = fs.readFileSync('./src/.encryptedKey.json', 'utf8');
    // Next we will create a wallet from this encryptedKey
    let wallet = new ethers_1.ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
    wallet = await wallet.connect(provider);
    console.log(process.env.PRIVATE_KEY);
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');
    // in Ethers, a factory is just a object that you can use to deploy contracts
    const contractFactory = new ethers_1.ethers.ContractFactory(abi, binary, wallet);
    console.log('Deploying, please wait...');
    const contract = await contractFactory.deploy({ gasLimit: 2000000 }); // STOP here! Wait for contract to deploy!
    //console.log(contract);
    // Now we can wait a block or more to make sure that the trx will be attached to the chain
    // Transaction receipt is what you get for block confirmation
    // if you dont have the wait(), then
    await contract.deployTransaction.wait(1);
    // Getting the current transaction Hash
    const txHash = contract.deployTransaction.hash;
    console.log('Deployment Transaction Hash:', txHash);
    // Getting the transaction details for reading the CLI
    provider
        .getTransaction(txHash)
        .then((transaction) => {
        console.log(`Sender: ${transaction.from}`);
        console.log(`Contract: ${transaction.to}`);
        console.log(`Transaction Data: ${transaction.data}`);
    })
        .catch((error) => {
        console.error(`Error: ${error}`);
    });
    /////////////////////////////////////////////////////////////////
    // console.log("Let's deploy with only transaction data!");
    //     const nonce = await wallet.getNonce();
    //     const tx = {
    //         nonce: nonce,
    //         gasPrice: 20000000000,
    //         gasLimit: 1000000,
    //         to: null,
    //         value: 0,
    //         data: '0x608060405234801561001057600080fd5b506107d9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632e64cec1146100675780636057361d146100855780636f760f41146100a15780638bab8dd5146100bd5780639e7a13ad146100ed578063cb3214471461011e575b600080fd5b61006f61014e565b60405161007c9190610592565b60405180910390f35b61009f600480360381019061009a91906104d5565b610157565b005b6100bb60048036038101906100b69190610479565b61016a565b005b6100d760048036038101906100d29190610430565b6101fa565b6040516100e49190610592565b60405180910390f35b610107600480360381019061010291906104d5565b610228565b6040516101159291906105ad565b60405180910390f35b610138600480360381019061013391906104d5565b6102e4565b6040516101459190610592565b60405180910390f35b60008054905090565b8060008190555061016661014e565b5050565b600360405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101d0929190610308565b505050806001836040516101e4919061057b565b9081526020016040518091039020819055505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6003818154811061023857600080fd5b9060005260206000209060020201600091509050806000015490806001018054610261906106a6565b80601f016020809104026020016040519081016040528092919081815260200182805461028d906106a6565b80156102da5780601f106102af576101008083540402835291602001916102da565b820191906000526020600020905b8154815290600101906020018083116102bd57829003601f168201915b5050505050905082565b600281815481106102f457600080fd5b906000526020600020016000915090505481565b828054610314906106a6565b90600052602060002090601f016020900481019282610336576000855561037d565b82601f1061034f57805160ff191683800117855561037d565b8280016001018555821561037d579182015b8281111561037c578251825591602001919060010190610361565b5b50905061038a919061038e565b5090565b5b808211156103a757600081600090555060010161038f565b5090565b60006103be6103b984610602565b6105dd565b9050828152602081018484840111156103da576103d961076c565b5b6103e5848285610664565b509392505050565b600082601f83011261040257610401610767565b5b81356104128482602086016103ab565b91505092915050565b60008135905061042a8161078c565b92915050565b60006020828403121561044657610445610776565b5b600082013567ffffffffffffffff81111561046457610463610771565b5b610470848285016103ed565b91505092915050565b600080604083850312156104905761048f610776565b5b600083013567ffffffffffffffff8111156104ae576104ad610771565b5b6104ba858286016103ed565b92505060206104cb8582860161041b565b9150509250929050565b6000602082840312156104eb576104ea610776565b5b60006104f98482850161041b565b91505092915050565b600061050d82610633565b610517818561063e565b9350610527818560208601610673565b6105308161077b565b840191505092915050565b600061054682610633565b610550818561064f565b9350610560818560208601610673565b80840191505092915050565b6105758161065a565b82525050565b6000610587828461053b565b915081905092915050565b60006020820190506105a7600083018461056c565b92915050565b60006040820190506105c2600083018561056c565b81810360208301526105d48184610502565b90509392505050565b60006105e76105f8565b90506105f382826106d8565b919050565b6000604051905090565b600067ffffffffffffffff82111561061d5761061c610738565b5b6106268261077b565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b83811015610691578082015181840152602081019050610676565b838111156106a0576000848401525b50505050565b600060028204905060018216806106be57607f821691505b602082108114156106d2576106d1610709565b5b50919050565b6106e18261077b565b810181811067ffffffffffffffff82111715610700576106ff610738565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6107958161065a565b81146107a057600080fd5b5056fea26469706673582212208972960f44e5924b7a9db02c6b7efa6d395be63c7d623e6baa29efad126df57a64736f6c63430008070033',
    //         chainId: 1337,
    //     };
    //     const sentTxResponse = await wallet.sendTransaction(tx);
    //     await sentTxResponse.wait(1);
    //     console.log(sentTxResponse);
    /////////////////////////////////////////////////////////////////
    const currentFavoriteNumber = await contract.retrieve();
    console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);
    // if we pass crazy massive numbers, javascript will get confused(numbers like 95843295834905834905803945803490548957)
    // In order to avoid issues, usually is best practice to pass numbers as string to contract functions
    const transactionResponse = await contract.store('7'); //storing a number is a trx, so it means that it will const gas
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();
    console.log(`Updated favorite number: ${updatedFavoriteNumber}`);
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