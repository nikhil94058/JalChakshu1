'use client'


import { Span } from "next/dist/trace";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {

    const [id,setId] = useState('');
   useEffect(()=>{
    setId(params.id);
   },[])

    // setId(params.id)

  return (
        <>
        jai mata di
        

        <div>{id}</div>


      <div className="w-full h-full">
        <h1 className="text-center ">Modify Your uploaded video</h1>

        <div className="flex justify-center items-center w-[60%] h-fullbg-red-400 border border-red-600 mx-auto">
          
  

        <div className="w-[70%] h-full bg-cyan-300 m-2">
show the previous upload here


        </div>

        <div className="flex flex-col m-2">
          <div className=" bg-blue-400 h-[60%]">
          try to have drag and drop option here
          </div>

      
             <div className=" bg-purple-400 ">

          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
     Upload another
  </span>
</button>

       <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Remove video</button>


          </div>
          </div>

   
        </div>


      </div>

        </>


  )
}