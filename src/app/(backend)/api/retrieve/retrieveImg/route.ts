import { pool } from "@/app/(backend)/config/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET()
{
    //here I have to get the query from the user about
    

    //Image retrieval from the db 
    //1. collect the img_id from the passed g_id
    //2. collect the img_data from t    he collected img_id


    try {
        await pool.connect();
        const query = await pool.query('SELECT new_data FROM images_grievance WHERE img_id = $1',[6]);

        // In order to retrieve data I am sending the exact base64String to the client
        //so that it can be used to fetch the image
        // console.log("resposnse from image retrieve: ",query.rows[0].new_data);
      
        return NextResponse.json( {
            'message':'got the img_data',
            'success':true,
            'data':await query.rows[0].new_data
        },{
            status:200,
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

export async function POST(req:NextRequest){

        let {id} = await req.json();

        try {
            console.log("body: ",id);


                
         await pool.connect();
        const query = await pool.query('SELECT new_data FROM images_grievance WHERE img_id = $1',[id]);

        // In order to retrieve data I am sending the exact base64String to the client
        //so that it can be used to fetch the image
        // console.log("resposnse from image retrieve: ",query.rows[0].new_data);
      
        return NextResponse.json( {
            'message':'got the img_data',
            'success':true,
            'data':await query.rows[0].new_data
        },{
            status:200,
        })



        } catch (e) {
            console.log("e(image retrieve) ",e.message)
             return NextResponse.json( {
            'message':e.message,
            'success':false,
            'data':'',
        },{
            status:502,
        })
        }
}

//route for fetching the images

//this fetching is done on reload of the page or may be clicking on the button

//or may be there will be a section whosoever click on a button will see a  
//section popping out of the the current window

//steps to achieve retrieval of images or the video 

//1. create an api endpoint to fetch the bytea content of the image 

//2. create a function which will create the bytea information to the actual 
//image


// 3. build the pop-up UI which will show the media

//4. proceed to video addition or grieviance section 



//Problems :-


// More details about it means with each post at the UI i want a button got added automatically 
//when the image is added or uploaded but there will be some info must be attached by the button
//or something that will help me to load the image uploaded by that specific person to anyone  

//1. I need something so that img_id can be saved to each button