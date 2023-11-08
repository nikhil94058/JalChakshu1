
'use client'


/**
 *              About the page
 * here the above page is responsible for the grievance upload of the user 
 * here we gave it option for the image and video upload and further added the video validation according to
 * which the duration of the video can't be more than 60 seconds
 * 
 */



import {useState} from 'react'
// import link from 
export default function ImgUpload()
{
    // const [Files,setFiles] = useState<File>();
    const [ImageFiles,setImageFiles] = useState<File>();
    const [VideoFiles,setVideoFiles] = useState<File>();
    const [text ,setText] = useState('')


   const [base64String,setBase64String] = useState({
    img:'',
    vid:''
   });
    //FUNCTION for image retrieval

    const imgRetrieve = async ()=>{
        try {
             const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/retrieve/retrieveImg',{
                method:'get',
            });
            //setting the base64 string
            const responseObj = await response.json();
            
            //here i am pasting the base64String along with required the required string to the src of the img
            setBase64String({...base64String,img:responseObj.data});
          
        } catch (e) {
            console.log("some error occurred while retrieval: ",e.message)
        }
    }
    //FUNCTION for video retrieval

    const vidRetrieve = async ()=>{
        try {
             const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/retrieve/retrieveVideo',{
                method:'get',
            });
            //setting the base64 string
            const responseObj = await response.json();


            //here i am pasting the base64String along with required the required string to the src of the img
            setBase64String({...base64String,vid:responseObj.data});
          
        } catch (e) {
            console.log("some error occurred while retrieval: ",e.message)
        }
    }


    //FUNCTION for image upload
    const ImageUpload=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

         if(!ImageFiles) return -1;

         try {
            
             const data = new FormData();
             data.set('file',ImageFiles);
                //till here everyting is fine
            //  console.log("heavyData: ",data.get('file'));

                const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/upload/uploadImg',{
                method:'post',
                body:data
            });

                   const resp = await response.json();


            console.log("response: ",resp.details.img_id);
            

             if(response.ok)
            {
                //or I can show some css toasts here 
                console.log("Image uploaded successfull!")

                return parseInt(resp.details.img_id);

            }
            else{
                console.log("Image upload failed");
                return  -1;
            }

         } catch (e:any) {
            console.log("error while uploading: ",e);
            return -2;
         }
       

    }

    //FUNCTION for video upload
    const VideoUpload=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

         if(!VideoFiles){ console.log("-1 when not found any file in state object");return -1;}

         try {

            //  video validations of more than 60 seconds  // 

            const video = document.createElement('video');
            video.preload= 'metadata'

            video.onloadedmetadata = function (){
                window.URL.revokeObjectURL(video.src);
                const duration = Math.floor(video.duration)

                if (duration > 60)
                {
                    //removing the file uploaded
                    setVideoFiles(undefined);
                }
                else{
                    const data = new FormData();
                     data.set('file',VideoFiles);
                }
            }
            
             
             console.log("files: ",VideoFiles)
                //till here everyting is fine
            //  console.log("heavyData: ",data.get('file'));

                const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/upload/uploadVid',{
                method:'post',
                body:data
            });

                const resp = await response.json();


            console.log("response(video): ",resp);
            
            if(response.ok)
            {
                //or I can show some css toasts here 
                console.log("Video uploaded successfull!")
                return parseInt(resp.details);

            }
            else{
                console.log("Video upload failed");
                return  -1;
            }

         } catch (e:any) {
            // add the toast here if 
            console.log("the video is not uploaded if the duration of the video is more than 60 seconds just reduce it")
            // console.log("error while uploading video: ",e);
            return -2;
         }

    }

    //handling grievances

    async function HandleGrievance(e:React.FormEvent)
    {
        e.preventDefault();
        let data = new FormData();

        //the checkThreshold function should be used from utils>checkThreshold

        data.set("text",text)
       
       
        //uploading images
        const imgresp = await ImageUpload(e)

        //uploading videos
       const vidresp =  await VideoUpload(e);

       //setting image response
       if(imgresp >= 0 && imgresp)
       {
             data.set("img_id",imgresp);
       }
       //setting the video response
       if(vidresp >= 0 && vidresp)
       {
             data.set("vid_id",vidresp);
       }

    //    console.log("my orgin is : ",process.env.NEXT_PUBLIC_ORIGIN)

    const fetchData= async ()=>
    {
        const resp = (await fetch(process.env.NEXT_PUBLIC_ORIGIN+'/userData'));
        const user = resp.json();
   
        return await user;
    }

    const res = await fetchData();

    const user =  res.user;

    // console.log("user")
    data.set("user_phone",user.phone);
    data.set("user_id",user.id);
    data.set("user_state",user.state);
    data.set("user_region",user.region);
    

      if (vidresp==-2 || imgresp==-2)
      {
        if(vidresp==-2) {
            //add the toast here as well
             console.log("please add video of duration upto 60seconds only");
        }
        console.log("Can't upload the media")
      }
      else{
        const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/upload/uploadGrievance',{
                method:'post',
                body:data
            });

       const ress = await response.json();

       console.log("grievance response: ",ress);
      }


    }

    return(
        <>
        {/* <form onSubmit={ImageUpload} >
            <input type="file" name="imgInput" 
            onChange={(e)=> setImageFiles(e.target.files?.[0])}
             id="imgInput" />
           <button
         type="button"
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><input type="submit" value="Upload" /></button>


        </form> */}


        <form 
        onSubmit={HandleGrievance}
        className='w-[50%] border-2 border-red-600'>
            <input type="text" className='m-1 border border-black border-spacing-2 w-[90%]' placeholder='Write your grievieance here' onChange={(e)=> setText(e.target.value)}/>

                  <label htmlFor="imgInput"> add Image</label>
                <input type="file" className='m-2 w-[90%]' name='imgInput' id='imgInput' onChange={(e)=> setImageFiles(e.target.files?.[0])}/>


                          <label htmlFor="imgInput"> add Video</label>
            <input type="file" className='m-2 w-[90%]' name='vidInput' id='vidInput' accept="video/*" max="60000" onChange={(e)=> setVideoFiles(e.target.files?.[0])}/>

            <button
         type="button"
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700   m-2 dark:focus:ring-purple-900"><input type="submit" value="Post" /></button>

        </form>

        <div>
            {/* <img 
            src={(base64String.img != '')? ("data:image/jpeg;base64,"+base64String):"https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" } 
            alt="img" /> */}
{/* 
           <video width="400" controls>
  <source src="" type="video/mp4">
  <source src="mov_bbb.ogg" type="video/ogg">

</video> */}

<video   src= {(base64String.vid != '')? ("data:video/mp4;base64,"+base64String.vid):"/videos/DataRetrieve.mp4"}
controls width="440" height="460"
></video>
      {/* <img src="/vid.gif" alt="gif" /> */}
            {/* <img src=alt="goodImg" /> */}
       </div>
               <div className='m-5 flex'>
       <button
         type="button"
         onClick={imgRetrieve}
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">FetchImg</button>


 
            
         <button 
         onClick={vidRetrieve}
         className="ml-9 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
     fetchVid
  </span>
</button>
         </div>
        </>
    )
}

