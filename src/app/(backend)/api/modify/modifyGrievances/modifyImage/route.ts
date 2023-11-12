




/**
 *          About the page
 * 
 * here the user has two controls remove and replace but
 * if the user got the permission of removing a thing then they might be easy to hide
 * any posted document from the government
 * 
 */



import { pool } from "@/app/(backend)/config/db";
import { NextRequest, NextResponse } from "next/server";

// either remove or replace the image


export async function POST(req:NextRequest)
{
    try {
        await pool.connect();

        let {gId,imgId , newId} = await req.json();

        

        console.log("body for exchanging grivance is:",gId, " newInd: ",newId);
        // newId:78
        // imgId:76
        // g_id:32
        // console.log("imgId",imgId);

        //1. setting newId inplace of previous id from the grievances relation

        const query = await pool.query('UPDATE grievances SET img_id = $1 WHERE g_id = $2',[newId,gId])
        // console.log("response of modifications: ",query);

        //2. deleting the previous image from the images relations

        if(imgId != 'null')
        {
            
        const queryTwo = await pool.query('DELETE FROM images_grievance WHERE img_id = $1',[imgId]);

        // console.log("response from deleting the media: ",queryTwo)
        }
        

        return NextResponse.json({
            message:'Image exchanged successfully',
            success:true,
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


/**
 *          working
 * here we are taking the old id to 
 */