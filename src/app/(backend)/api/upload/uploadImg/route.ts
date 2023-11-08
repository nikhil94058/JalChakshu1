
import { NextRequest,NextResponse } from "next/server";
import {pool} from '@/app/(backend)/config/db'
export async function POST(req:NextRequest)
{
    try{
        await pool.connect();
        const data = await req.formData();

        const file:File | null = data.get('file') as unknown as File

        if(!file) 
        {
            return NextResponse.json({
                success:'false'
            })
        }

        //**********Let  just check the docs on your own for the trustfullness of the given comment?  */

            //Here I am getting the bytes and by the help fo the method "arrayBuffer" it is 
            //coverting those bytes into an array 
            const bytes = await file?.arrayBuffer();
            //further here I am taking that array of bytes storing it in the Buffer(temporary Storage)
            const buffer = Buffer.from( bytes);

        
        // Convert the buffer to a Base64 string
        const base64String = buffer.toString('base64');

             let time = new Date();
const timeObj = {
    'title':time.toString(),
    'hour':time.getHours(),
    'date':time.getDate(),
    'day': time.getDay(),
    'month':time.getMonth()+1,
    'year':time.getFullYear(),
    'minutes':time.getMinutes()
}
         

            //inserting into db

            const uploadToDb = async()=>
            {
               
                    //here i am passing a string data as my img_data to the db because it is further needed to be string
       try
                {
                    await pool.connect();
                   const query= await pool.query('INSERT INTO  images_grievance (title , month, date, year,day ,hour, minutes,img_data,new_data) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[timeObj.title,timeObj.month,timeObj.date,timeObj.year,timeObj.day,timeObj.hour,timeObj.minutes,null,base64String]);

                // const query = await pool.query('SELECT * FROM images_grievance');

                return await query;
                  

                }
                catch(e)
                {

                    console.log("Error while entering the user in db: ", e.message)
                    return NextResponse.json({
                    'success': false,
                    'message':e.message,
                    'details':''
                   },{
                    status:500,
                   })

                }
            }
           const query =await uploadToDb();


            const fetchQuery = await pool.query(
            "SELECT img_id FROM images_grievance WHERE title = $1",
            [timeObj.title]
          );

        //   console.log("quefetchQuery: ", fetchQuery.rows[0]);

             return NextResponse.json({
                    'success': true,
                    'message':'Image Uploaded Successufully',
                    'details':await fetchQuery.rows[0],
                   },{
                    status:200,
                   })
        }
       
    
    catch(e){

        return Response.json({
            message:e.message,
        },{
            status:502
        })
    }
}



//imgId
