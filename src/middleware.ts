//can write multiple middlewares using condition




import { NextResponse, NextRequest } from 'next/server'

import {verify} from 'jsonwebtoken'
import Decrypt from './utils/Decrypt';
export async function middleware(req:NextRequest)
{
let url = req.nextUrl.clone();

    try {
  let resp;

     if(req.cookies.has("Auth")){
       let  encryptedToken =await req.cookies.get("Auth")?.value;
      
    const token:string = Decrypt(encryptedToken);

        //redirect to intended location
         const user = await verify(token,process.env.NEXT_PUBLIC_PRIVATE_KEY);

          resp = NextResponse.next();
        resp.headers.set('verified','true'); 
        resp.headers.set('user',await user); 
  

            url.pathname = '/';
 return NextResponse.rewrite(url);

}
else{
  let resp = NextResponse.next();
  url.pathname = '/';
    resp.headers.set("verified",'false');
    
 return NextResponse.rewrite(url);
}
  
} catch (e) {
let resp = NextResponse.next();
  resp.headers.set("verified",'false');
 return NextResponse.rewrite(url);

}
  
}

export const config = {
    matcher: ['/random','/imagePosting','/modifyGrievance' ],
};