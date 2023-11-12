import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/(backend)/config/db";

export async function PUT(req:NextRequest)
{

    try {
        const {newId,vidId,gId} = await req.json();
        await pool.connect();

         const queryOne = await pool.query('UPDATE grievances SET vid_id = $1 WHERE g_id = $2',[newId,gId]);

         // console.log("my updated response for video: ",queryOne.rows[0]);

         //2. now deleting the previous video
         
    if(vidId != 'null')
    {
            const queryTwo = await pool.query('DELETE FROM videos_grievance WHERE vid_id = $1',[vidId]);

      //   console.log("response from deleting the media: ",queryTwo)

      
    }

      return NextResponse.json({
            message:"updated the new video id successfully",
            success:true,
         },{
            status:200
         })

    } catch (e) {
       return NextResponse.json({
            message:e.message,
            success:false,
         },{
            status:502
         })
    }
}