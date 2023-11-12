import { pool } from "@/app/(backend)/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest)
{
    try {

        const {newMessage,gId} = await req.json();

        // console.log(
        //     "new: ",newMessage," gId: ",gId
        // )

        await pool.connect();
      
         const query = await pool.query('UPDATE grievances SET message = $1 WHERE g_id = $2',[newMessage,gId]);

        //  console.log("updating text query is: ",query);

        return NextResponse.json({
            message:"updated the grievance successfully",
            success:true,
         },{
            status:200
         })

         

    } catch (e) {
      return  NextResponse.json({
            message:e.message,
            success:false,
         },{
            status:502
         })
    }
}