import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/(backend)/config/db";

export async function POST(req: NextRequest) {
  try {
            const data = await req.formData();

    // console.log("data: ", data);

    const file: File | null = (await data.get("file")) as unknown as File;

    // console.log("file: ",file);
    if (!file) {
      return NextResponse.json({
        message: "Cannot get the file",
        success: false,
      });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //converting into base64String

    const base64String = buffer.toString("base64");

    ////
    const uploadToDb = async () => {
      let time = new Date();

      const timeObj = {
        title: time.toString(),
        hour: time.getHours(),
        date: time.getDate(),
        day: time.getDay(),
        month: time.getMonth() + 1,
        year: time.getFullYear(),
        minutes: time.getMinutes(),
      };
      try {
        await pool.connect();

        const query = await pool.query(
          "INSERT INTO  videos_grievance (title , month, date, year,day ,hour, minutes,vid_data) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
          [
            timeObj.title,
            timeObj.month,
            timeObj.date,
            timeObj.year,
            timeObj.day,
            timeObj.hour,
            timeObj.minutes,
            base64String,
          ]
        );

        console.log("got this response: ", query);

        try {
          const fetchQuery = await pool.query(
            "SELECT vid_id FROM videos_grievance WHERE title = $1",
            [timeObj.title]
          );

          // console.log("quefetchQuery: ", fetchQuery.rows[0]);
          return NextResponse.json(
            {
              message: "got the the query",
              success: true,
              details: await fetchQuery.rows[0].vid_id,
            },
            {
              status: 200,
            }
          );
        } catch (e) {
          console.log("error while uploading to db: ", e);
          return Response.json(
            {
              message: e.message,
            },
            {
              status: 502,
            }
          );
        }
      } catch (e) {
        console.log("error while uploading to db: ", e);
        return Response.json(
          {
            message: e.message,
          },
          {
            status: 502,
          }
        );
      }
    };

    return uploadToDb();

    /////
  } catch (e) {
    console.log("got the error while uploading: ", e.message);
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
