
import {NextRequest, NextResponse} from 'next/server'
export async function GET(req:NextRequest)
{
   try {
     const response = NextResponse.json({
        message:'logged out',
        success:'true'
    })
    
    //deleting the cookie by setting out an empty cookie 

    response.cookies.set('Auth','',{
        maxAge: 0,
    })

    return response;

   } catch (e) {
    const response = NextResponse.json({
        message:e.message,
        success: 'false'
    })

    return response;
   }

} 