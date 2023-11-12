

'use client'


import { useEffect, useState } from "react";
export default function Page({params}:{ params: { id: string } })
{
    const [id,setId] = useState(params.id[0]);
    const [newMessage,setNewMessage] = useState('')
    const [fGriev,setFGriev] = useState('');



    const grievanceRetrieve = async (id:string)=>
    {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/api/retrieve/retrieveText',{
                method:'PUT',
                body:JSON.stringify({
                    gId:id
                })
            });

        const resp = await response.json();

        // console.log("this is my resp of fetching: ",resp);

        if(resp.success)
        {
            setFGriev(resp.message);
            console.log("fetched successfully")
        }
        else{
            console.log(resp.message);
        }
        } catch (e) {
            console.log("err: ",e.message);
        }
    }

    useEffect(()=>{
        grievanceRetrieve(id);
    },[params,fGriev])


    const grievanceUpload = async (e:any)=>
    {
       try {
         e.preventDefault();
        
          const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/api/modify/modifyGrievances/modifyText',{
      method:'PUT',
      body:JSON.stringify({
        newMessage:newMessage,
        gId:id
      })
    } )

    const resp = await response.json();

    // console.log("text responnse: ",resp);

    if(resp.success)
    {
        //add a toast here
        console.log(resp.message);

        grievanceRetrieve(id);
    }
    else{
        //add a toast here
        console.log(resp.message);
    }
       } catch (e) {
        console.log("error while updating the text: ",e.message);
       }

    }

    return (
        <>
        jai mata di

        <div>id:{id}</div>

        
      <div className="w-full h-full">
        <h1 className="text-center ">Modify Your uploaded grievance</h1>

        <div className="flex justify-center items-center w-[60%] h-fullbg-red-400 border border-red-600 mx-auto">
          
  

        <div className="w-[70%] h-full bg-cyan-300 m-2">

        {fGriev}


        </div>

        <div className="flex flex-col m-2">
          <div className=" bg-blue-400 h-[60%]">
           <form 
           onSubmit={grievanceUpload}
           >
            
               <label htmlFor="textInput"> add text</label>
            <input type="text" className='m-2 w-[90%]' name='textInput' onChange ={e=> setNewMessage(e.target.value)} />

            <button
         type="button"
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700   m-2 dark:focus:ring-purple-900"><input type="submit" value="Post" /></button>

        </form>
          </div>

      
             <div className=" bg-purple-400 ">

    

          </div>
          </div>

   
        </div>


      </div>

        </>
    )
}