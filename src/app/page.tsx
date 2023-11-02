'use client'


import { useState } from "react";

export default function Home() {
  const [payload,setPayload] = useState({
    phone:'',
    password:''
  });

  const handleChange=(e)=>{

    console.log("name: ",e.target.name,"val: ",e.target.value);
    setPayload((pre)=>{
     console.log("pre: ",pre);
      return(
        {
         phone: (e.target.name=='phone')? e.target.value:pre.phone,
          password:(e.target.name=='password')? e.target.value:pre.password,
        }
      )
    })

    
  
  }
  //handling the submit request
  const handleSubmit = async (e)=>{
    e.preventDefault();

    console.log("payload: ",payload);

    //validations
  
    // const firstcheck = /@/; 
    // const seccheck = /@/; 
    // const thirdcheck = /@/; 
    // const fourcheck = /@/; 
    // const firstcheck = /@/; 
    // const firstcheck = /@/; 
    // const firstcheck = /@/; 
    if(phone?.length == 10)
    {
      //invalid credentials
      return;
    }

    const config = {
      method:'POST',
      header:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(payload)
    }

    let res = (await (await fetch('http://localhost:3003/api/SignIn',config)).json())


    //setting up the toast notifications

     if(res.message.name)
     {
      //user founded
     }
    else if(res.name)
     {
      //Invalid credentials 
     }
     else {
      //Something went wrong
     }


     

    
  }

  return (
   <>
   Landing page goes by here

    <h1>SignIn</h1>

   <form  className='w-1/2 p-2 m-2 border-2 border-black rounded-md flex flex-col' onSubmit={handleSubmit}>
    <input type="text" id="phone" name='phone' placeholder='phone' className='w-full p-2 m-1 border-2 border-blue-700 rounded-md' onChange={handleChange} value={payload.phone} required/>
    <input type="password" id="password" name='password' placeholder='password' className='w-full p-2 m-1 border-2 border-blue-700 rounded-md' onChange={handleChange} value={payload.password} required/>
    <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><input type="submit" value="LogIn" /></button>
    </form>
   </>
  )
}
