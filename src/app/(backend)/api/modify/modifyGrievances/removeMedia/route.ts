

//here I will remove the both videos and Images so that there will be as low code as possible 

import { pool } from "@/app/(backend)/config/db";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest)
{

    try {

     const {media,id,gId}= await req.json();


     //1. updating the grievance table and removing the media id

        await pool.connect();

        console.log("media: ",media," id: ",id);

        if(media=="image")
        {
            
               const queryOne = await pool.query('UPDATE grievances SET img_id = $1 WHERE g_id = $2',[null,gId]);

        console.log("response of modifications: ",queryOne);


        //2. Deleting the required field from the media table

        const queryTwo = await pool.query('DELETE FROM images_grievance WHERE img_id = $1',[id]);

        console.log("response from deleting the media: ",queryTwo)

        }
    else if(media=='video')
        {
                    const queryOne = await pool.query('UPDATE grievances SET vid_id = $1 WHERE g_id = $2',[null,gId]);

        console.log("response of modifications: ",queryOne);


        //2. Deleting the required field from the media table

        const queryTwo = await pool.query('DELETE FROM videos_grievance WHERE vid_id = $1',[id]);

        console.log("response from deleting the media: ",queryTwo)
        }

        return NextResponse.json({
            message:'Media is removed successfully',
            success:true
        },{
            status:200
        })

    } catch (e) {
        return NextResponse.json({
            message:e.message,
            success:false
        },{
            status:502
        })
    }

}