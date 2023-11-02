import {AES} from 'crypto-js'

export default function Encrypt(token:string)
{
     const newToken = AES.encrypt(token,process.env.NEXT_PUBLIC_PRIVATE_KEY).toString();
     return newToken;
}