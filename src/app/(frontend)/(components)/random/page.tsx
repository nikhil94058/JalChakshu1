'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getData from '@/app/(backend)/userData/route'
export default function Page()
{
    const [user,setUser] = useState({username:'Notfetched',phone:'Notfetched'});

    //Logging Out
    const router = useRouter();
    async function LogOut()
    {
        const resp = (await (await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/api/SignOut')).json());

        if(resp.success == 'true')
        {
            setUser({username:'Notfetched',phone:'Notfetched'})
            router.push('/')
        }
    }


    //for fetching userData
    async function fetchData()
    {
        const resp = (await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/userData'));
        const user = resp.json();
   
        return await user;

    }
    useEffect( ()=>{
fetchData().then((res)=>{
   
    setUser(res.user);
}).catch((e)=>{
    console.log("error: ",e.message);
})
    
    },[])

    return (
        <>
        jai mata di

        <div>this is random page</div>
        <div>
            <p>name:{user.username}</p>
            <p>phone:{user.phone}</p>
        </div>

        <br />
        <br />
        <br />
        <h2><button
         type="button"
         onClick={LogOut}
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">LogOut</button></h2>
        </>
    )
}