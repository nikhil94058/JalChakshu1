import { pool } from "@/app/(backend)/config/db";
import { NextResponse } from "next/server";


export async function POST(req:NextResponse)
{
    try {

         await pool.connect();

        let {id}=await req.json();


        console.log(
            "vid_id: ",id
        )
       

        let query =  await pool.query("SELECT vid_data FROM videos_grievance WHERE vid_id = $1",[id]);
        const dataa = query;
        // const dataa=undefined;
            // console.log("this is the query got back: ",dataa);

        return NextResponse.json({
            message:'Got the video',
            data: await dataa.rows[0].vid_data,
            success:true,
        },{
            status:200
        })

    } catch (e) {
        return NextResponse.json( {
            'message':e.message,
            'success':false,
            'data':'',
        },{
            status:502,
        })
    }
}