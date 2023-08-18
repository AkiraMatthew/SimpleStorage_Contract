import { ethers } from 'ethers';
import * as fs from 'fs';
import 'dotenv/config';

// we gonna to set this script up to run our encrypt key one time
// and then we can remove our private key from anywhere in the workspace
// so that it is no longer in plain text in the code
async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    // the encrypt()u function will return an encrypted Json key that storages locally
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY
    );

    console.log(encryptedJsonKey);
    fs.writeFileSync('./src/.encryptedKey.json', encryptedJsonKey);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(0);
    });
