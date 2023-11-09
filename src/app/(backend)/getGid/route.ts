import {cookies} from 'next/headers'
import {verify} from 'jsonwebtoken'
import { pool } from '../config/db';
import Decrypt from '@/utils/Decrypt';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req:NextRequest)
{
   try {
     const cookieStore = cookies();

    const encryptedToken = cookieStore.get('Auth')?.value;

    const token:string = Decrypt(encryptedToken);

    const user = await verify(token,process.env.NEXT_PUBLIC_PRIVATE_KEY);//here we get the complete user object
    
      const query = await pool.query('SELECT g_id,img_id,video_id FROM grievances WHERE user_id = $1',[user.id]);
        const data = query.rows[0];

   return NextResponse.json({user:user,grievance_data:{'g_id':data.g_id,'img_id':data.img_id,'video_id':data.video_id}})
   
   } catch (e) {
   //  console.log("Error: ",e);
    return NextResponse.json({user:'',grievance_data:'',message:e.message})
   }
}