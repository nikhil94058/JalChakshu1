
import { NextRequest,NextResponse } from "next/server";
import {pool} from '@/app/(backend)/config/db'
export async function POST(req:NextRequest)
{
    try {

            const data = await req.formData();
            const text = data.get('text');
            const vid_id = data.get('vid_id');
            const img_id = data.get('img_id');
            const user_phone = data.get("user_phone");
            const  user_id= data.get("user_id");
            const  user_state =  data.get("user_state");
            const   user_region =data.get("user_region");
            await pool.connect();
   

    console.log("text: ",text);
    // console.log("user: ",user);    
    
             const query = await pool.query('INSERT INTO grievances(message , user_id, user_phone, img_id, video_id, state, region) VALUES ($1,$2,$3,$4,$5,$6,$7)',[text,user_id,user_phone ,img_id,vid_id,user_state,user_region]) 

             const queryResponse = await query.rows[0];
            return NextResponse.json({
                "message":'grievance added successfully',
                "details":await queryResponse
            },{
                status:200
            })

        } catch (e) {
            console.log("error from the backend:",e)
            return NextResponse.json({
                "message":e.message,
            },{
                status:502
            })
        }
}

