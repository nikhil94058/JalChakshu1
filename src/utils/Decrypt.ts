

import CryptoJS from 'crypto-js';


export default function Decrypt(encryptedToken:string)
{
    const token = CryptoJS.AES.decrypt(encryptedToken,process.env.NEXT_PUBLIC_PRIVATE_KEY).toString(CryptoJS.enc.Utf8);
    return token;
}