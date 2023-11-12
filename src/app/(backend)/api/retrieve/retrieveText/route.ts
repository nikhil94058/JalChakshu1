


import { pool } from "@/app/(backend)/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest)
{
    try {

        const {gId}= await req.json();
        await pool.connect();

        // console.log("gid: ",gId);

        const query = await pool.query('SELECT message FROM grievances WHERE g_id = $1',[gId])

        const resp = await query;

        // console.log("resp fetched :",query.rows[0].message);

        return NextResponse.json({
            message:await query.rows[0].message,
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