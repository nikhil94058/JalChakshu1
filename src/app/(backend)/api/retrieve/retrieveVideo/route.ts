import { pool } from "@/app/(backend)/config/db";
import { NextResponse } from "next/server";


export async function GET()
{
    try {

        const vid_id = 2;
        await pool.connect();

        let query =  await pool.query("SELECT vid_data FROM videos_grievance WHERE vid_id = $1",[vid_id]);
        const dataa = query.rows[0].vid_data;
        console.log("this is the query got back: ");

        return NextResponse.json({
            message:'Got the video',
            data:dataa,
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