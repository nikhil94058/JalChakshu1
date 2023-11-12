

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: String[] } }) {

  const router = useRouter();

   const [ImageFiles,setImageFiles] = useState<File>();
   const [id,setId] = useState( params.id[0]);
  //  const [prevId , setPrevId] = useState('');
   
    const g_id = params.id[1];
    const img_id:any = params.id[0];

    // console.log("params.id: ",params.id)

    console.log("img_id:",img_id," g_id: ",g_id);

   const [base64String,setBase64String] = useState({
    img:'',
    vid:''
   });

   //function which help in modifying the slug of the url as per the content
   const changeSlug=async (id:any)=>
   {
    router.push(`/modifyGrievance/modifyImage/${id}/${g_id}`, { scroll: false })
   }

   
      //  FUNCTION for image retrieval

    const imgRetrieve = async (id:String)=>{
        try {

             const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/retrieve/retrieveImg',{
                method:'post',
                headers:{
                  'Content-type':'application/json'
                },
                body:JSON.stringify({id:id})
            });
            //setting the base64 string
            const responseObj = await response.json();
            
            // console.log("responseObj: ",responseObj)
            
            //here i am pasting the base64String along with required the required string to the src of the img
            setBase64String({...base64String,img:responseObj.data});
            // console.log("base64inside:",base64String)
          
        } catch (e) {
            console.log("some error occurred while retrieval: ",e.message)
        }

        // console.log("base64:",base64String);
    }


    useEffect(()=>{
   setId(img_id);
    imgRetrieve((id || params.id[0]));
    changeSlug((id || params.id[0]));

   },[params.id])


   useEffect(()=>{

    // console.log("imgdata; ",base64String.img);
  
   },[base64String,id])

   //methods to change the image media of the grievance


   //1. upload the new image and get its image_id
   

    //FUNCTION for image upload
    const ImageUpload=async (e:any)=>{
        e.preventDefault();

         if(!ImageFiles) {console.log("can't able to find the imageresponse");}

         try {
            
             const data = new FormData();
             data.set('file',ImageFiles);

                const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/upload/uploadImg',{
                method:'post',
                body:data
            });

                   const resp = await response.json();


            console.log("response(Image upload): ",resp.details);
         

             if(resp.success)
            {
                //or I can show some css toasts here 
                console.log("Image uploaded successfull!")

                // return parseInt();

                const new_id = resp.details.img_id;

                
   //2. change the new gnenerated image id with the new one from 

                const respond = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/modify/modifyGrievances/modifyImage',{
                  method:'post',
                  headers:{
                    "Content-type":'application/json',
                  },
                  body:JSON.stringify({
                    gId:g_id,
                    newId:new_id,
                    imgId:img_id
                  })
                })

                const resp2 = await respond.json();
                console.log("response after modifications: ",resp2);

                if(resp2.success)
                {
                  console.log("Modified successfull")

                  //again Showing the new Image
                  imgRetrieve(new_id);
                    setId(new_id)
                      changeSlug(new_id);
                }
                else
                {
                  console.log("modifications unsuccessfull")
                }


            }
            else{
                console.log("Image upload failed");
            }

         } catch (e:any) {
            //I think we can add the toast message here as it is the client side event and contains
            //not any kind of credentials connected to the site but the only problem is that the message
            //will be more complex for an non-tech user to understand 
            console.log("Soemthing went wrong while uploading: ",e.message);
            // return -2;
         }
       

    }


    //function for removing image

    const ImageRemoval=async (e:any)=>
    {
      try {

        //1. image removal

        const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/api/modify/modifyGrievances/removeMedia',{
          method:'DELETE',
          body:JSON.stringify({
            media:'image',
            id:id,
            gId:g_id
          })
        })

        const resp = await response.json();

        console.log("resp: ",resp);

        //2. upload the removed image on the ui


             imgRetrieve(id);
              changeSlug('null');

      } catch (e) {
        console.log("got the error while removing the media: ",e.message);
      }
    }


  

  return (
        <>
        jai mata di
        

        {/* <div>{params.id}</div> */}


      <div className="w-full h-full">
        <h1 className="text-center ">Modify Your uploaded Image</h1>
        <h1 className="text-center ">Note: may be i ma able to retrieve the image but pgAdmin is not working so the problem is there</h1>

        <div className="flex justify-center items-center w-[60%] h-fullbg-red-400 border border-red-600 mx-auto">
          
  

        <div className="w-[70%] h-full bg-cyan-300 m-2">

            {/*previous image */}
             <img 
            src={(base64String.img != '')? ("data:image/jpeg;base64,"+base64String.img):"https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" } 
            alt="img" />

        </div>

        <div className="flex flex-col m-2">
          <div className=" bg-blue-400 h-[60%]">
          try to have drag and drop option here

          <form onSubmit={ImageUpload} >

          <input type="file" onChange={e=> setImageFiles(e.target.files?.[0])}/>

      <button>
            <input 
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          type="submit" 
          value={"Upload"} />
      </button>
          </form>

          </div>

      
             <div className=" bg-purple-400 ">

     
  

       <button 
       onClick={ImageRemoval}
       type="button"
        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
        Remove Image</button>


          </div>
          </div>

          

   
        </div>


      </div>

       <button 
       onClick={changeSlug}
       type="button"
        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
        change slug</button>

      {/* <video   src= {(base64String.vid != '')? ("data:video/mp4;base64,"+base64String.vid):"/videos/DataRetrieve.mp4"}
controls width="440" height="460"
></video> */}

        </> 


  )
}












