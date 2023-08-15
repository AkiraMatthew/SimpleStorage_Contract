"use strict";
// synchronous - [solidity]
// asynchronous - [javascript]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('hi');
        let variable = 5;
        console.log(variable);
        // deploy a contract? Wait for it to be dployerd
        // contract.deploy -> wouldn't wait for it to finish -> if is not async function
    });
}
main().then(() => proccess.exit(0).catch((error) => {
    console.log(error);
    proccess.exit(1);
}));
//# sourceMappingURL=deploy.js.map