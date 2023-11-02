//this is a ServerAction for handling signIn 
import {pool} from '@/app/(backend)/config/db'
import {sign} from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import Encrypt from '@/utils/Encrpt';
 export async function POST(req:Request){
    
   try {

    await pool.connect();
        let {phone , password} = await req.json();

    
    let user = await pool.query(`SELECT * FROM users WHERE phone = $1`,[phone])

    const resp = {
        user:await user.rows[0],
        message: {
            name:'success'
        }
    }
  
   //setting up the jwt
    const token = await sign(user.rows[0],process.env.NEXT_PUBLIC_PRIVATE_KEY,{expiresIn:'24h'});


    //encrypting the token
    const newToken = Encrypt(token);


     const responseReturn =  NextResponse.json(await resp,{
    status: 200,
  });

  //setting cookies
  responseReturn.cookies.set('Auth',newToken,{
    httpOnly:true
  })

   return responseReturn;
    
   } 
    catch (e) {
        return Response.json({message:e},{
            status:200,
        });
   }


   //handling at the client

   //1. check for message.name = "sucess" 'found the client successfully'
   //2. message.name = "error" 'user not found'
   //3. message.name = undefined 'server is down' , 'something went wrong'
} 

export async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}


//1. if messasge:{} then user not found
//2. if message.error somethign went wrong
