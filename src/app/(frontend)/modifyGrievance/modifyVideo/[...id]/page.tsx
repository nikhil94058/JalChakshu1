'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string[] } }) {

  const router = useRouter();

     const [VideoFiles,setVideoFiles] = useState<File>();
   const [id,setId] = useState(params.id[0]);
   
    const g_id = params.id[1];
    const vid_id:any = params.id[0];


    console.log("img_id:",vid_id," g_id: ",g_id);

   const [base64String,setBase64String] = useState({
    img:'',
    vid:''
   });

    //function which help in modifying the slug of the url as per the content
   const changeSlug=async (id:any)=>
   {
    router.push(`/modifyGrievance/modifyVideo/${id}/${g_id}`, { scroll: false })
   }


   
   const vidRetrieve = async (id: string) => {
  try {
    // let id = 32
    const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/retrieve/retrieveVideo', {
      method: 'post',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({id: id})
    });


      const responseObj = await response.json();

      console.log("responseobj: ", responseObj);

      // Update the state using the state updater function
      setBase64String(prevState => ({
        ...prevState,
        vid: responseObj.data
      }))
      
      // console.log('base64: ', responseObj.data);
   
  } catch (e) {
    console.log("An error occurred while fetching data: " + e.message);
  }
}


   useEffect(()=>{
    setId(id || vid_id);
      vidRetrieve((id || vid_id))
      changeSlug((id || vid_id))

   },[params.id])


  
   useEffect(()=>{
    // console.log("base64String" ,base64String.vid);
    // setBase64String(...base64String);
   },[base64String])



   //methods to change the media of tbe site

   //function for video upload

   
    const handleVideoChange = async (e:any)=>
    {
        //video validations for 60 seconds
        let duration;
        var vid = document.createElement('video');
        console.log("ready to handle the video!!!");
        
        if (e.target.files?.[0])
        {
        var fileURL = URL.createObjectURL(e.target.files[0]);
  vid.src = fileURL;
  // wait for duration to change from NaN to the actual duration
  vid.ondurationchange = function() {
    duration = Math.floor(vid.duration);

    if (duration > 60)
    {
        //add a toast message here that the uploaded video length is more than 60 seconds
        alert("can't upload the files (>60) error and your files are also not being uploaded");
        // add something in The ui as well that if the size is more than 60 seconds then remove
        //the even the view of file form the input element of the form!!!

        setVideoFiles(undefined);
    }
    else{
        setVideoFiles(e.target.files[0]);

        //add here the toast notifications 
        console.log('the video file is added successfully ')
    }

    console.log("durations is: ",vid.duration);

        }

    };


    }

    //FUNCTION for video upload
    const VideoUpload=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

         if(!VideoFiles){ console.log(" Not find any file add in the ui that the current file is not uploaded");return -1;}

         try {

            //  video validations of more than 60 seconds  // 
            const data = new FormData();
                      
             
             console.log("files: ",VideoFiles)

             data.set("file",VideoFiles);

                const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/upload/uploadVid',{
                method:'post',
                body:data
            });

                const resp = await response.json();

              // let resp = {details:'43',success:true}

            console.log("response(video): ",resp);
            
            if(resp.success)
            {
                //or I can show some css toasts here 
                
              
                console.log("new id: ",resp.details);
                vidRetrieve(resp.details)


                //updtaing the grievance according to it

                const nextResponse = await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/api/modify/modifyGrievances/modifyVideo',{
                  method:'PUT',
                  body:JSON.stringify({
                    newId:resp.details,
                    gId:g_id,
                    vidId:id 
                  })
                } )

                const resp2 = await nextResponse.json();

                console.log("response got after updating the grievance: ",resp2)

                if(resp2.success)
                {
                  setId(resp.details)
                  vidRetrieve(resp.details)
                  changeSlug(resp.details)
                  console.log("Video uploaded successfull!")
                }


            }
            else{
                console.log("Video upload failed");
  
            }

         } catch (e:any) {
            // add the toast here
            console.log("something went wrong while uploading the file")
            console.log("error while uploading video: ",e);
         }

    }


    const vidRemoval = async (e:any)=>
    {
      try {
        
        const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/api/modify/modifyGrievances/removeMedia',{
          method:'DELETE',
          body:JSON.stringify({
            media:'video',
            id:id,
            gId:g_id
          })
        })

        
        const resp = await response.json();

        console.log("resp: ",resp);

        vidRetrieve(id);
        changeSlug('null');

      } catch (e) {
          console.log("got the error while removing the media: ",e.message);
      }

    }


  return (
        <>
        jai mata di
        

        <div>{params.id}</div>


      <div className="w-full h-full">
        <h1 className="text-center ">Modify Your uploaded video</h1>

        <div className="flex justify-center items-center w-[60%] h-fullbg-red-400 border border-red-600 mx-auto">
          
  

        <div className="w-[70%] h-full bg-cyan-300 m-2">
 <video 
 src= {"data:video/mp4;base64,"+base64String.vid}
 controls width="440" height="460"  >
        
      </video>

        </div>

        <div className="flex flex-col m-2">
          <div className=" bg-blue-400 h-[60%]">
           <form 
           onSubmit={VideoUpload}
           >
            
               <label htmlFor="imgInput"> add Video</label>
            <input type="file" className='m-2 w-[90%]' name='vidInput' onChange={handleVideoChange}/>

            <button
         type="button"
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700   m-2 dark:focus:ring-purple-900"><input type="submit" value="Post" /></button>

        </form>
          </div>

      
             <div className=" bg-purple-400 ">

       

       <button 
       onClick={vidRemoval}
       type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Remove video</button>


          </div>
          </div>

   
        </div>


      </div>

    


        </>


  )
}