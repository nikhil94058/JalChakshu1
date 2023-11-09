'use client'

import Link from "next/link"
import { useState,useEffect } from "react";
export default  function ModifyGrievance()
{
    const [cnt,setCnt] = useState(0);
    const[data,setData] = useState({
        g_id:'',
        img_id:'',
        video_id:''
    })

       useEffect( ()=>{

            //function for grievance id 

            //added in the useEffect because want that the customer will immediatel able to work on the modifciations
        
        const fet = async ()=>{
            const resp =await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/getGid');
            const user = await resp.json();

            const grievance_data = user.grievance_data;

            setData(grievance_data);
        }

        fet()

       },[])


         
        

    //generting slug for the video
 
    return (
        <>
      
        <div className="flex flex-col justify-center items-center m-3">

            <div>
                data: {JSON.stringify(data)}
            </div>

 <div>
         <Link href={`/modifyGrievance/modifyText/${data.g_id}`}>
        <button 
            className="relative inline-flex items-center justify-center m-4 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      modify Text
  </span>
</button>
      </Link>
            
 </div>

<div>
    
{data.img_id && (
    <Link href={`/modifyGrievance/modifyImage/${data.img_id}`}>
<button type="button" className="text-yellow-400 hover:text-white border m-4 border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">  modify Image</button>
</Link>
)}

</div>


<div>
    {data.video_id && (<Link href={`/modifyGrievance/modifyVideo/${data.video_id}`}>
<button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 m-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      modify Video
  </span>
</button>
</Link>)}
</div>



        </div>



        </>

    )
}

/**
 *          problems
 * 1.
 * 
 */