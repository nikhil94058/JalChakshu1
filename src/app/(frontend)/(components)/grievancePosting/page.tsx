
'use client'




/**
 *      about the page 
 * here the above page is responsible for the grievance upload of the user 
 * here we gave it option for the image and video upload and further added the video validation according to
 * which the duration of the video can't be more than 60 seconds
 * 
 * here is some return rule as well if the return is -1 (means the file not found (as the user haven't uploaded anything) and user can post)
 * but if the return is -2 (means some error has been occured while uploading that file which is neither
 * connected to the validation issue nor user not uploaded anything case) "it is response should be Something went wrong!!!"
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
    // //below useState is created to know whether the user actually tried to upload image or video
    // const [isUploaded,setIsUploaded] = useState({
    //     img:false,
    //     vid:false
    // })



    //FUNCTION for image upload
    const ImageUpload=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

         if(!ImageFiles) {console.log("can't able to find the imageresponse");return -1;}

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

                return parseInt(resp.details.img_id);

            }
            else{
                console.log("Image upload failed");
                return  -1;
            }

         } catch (e:any) {
            //I think we can add the toast message here as it is the client side event and contains
            //not any kind of credentials connected to the site but the only problem is that the message
            //will be more complex for an non-tech user to understand 
            console.log("Soemthing went wrong while uploading: ",e.message);
            return -2;
         }
       

    }


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


            console.log("response(video): ",resp);
            
            if(resp.success)
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
            // add the toast here
            console.log("something went wrong while uploading the file")
            console.log("error while uploading video: ",e);
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
        let imgresp = await ImageUpload(e)

        //uploading videos
       let vidresp =  await VideoUpload(e);

       
    console.log("videresp: ",vidresp);
    console.log("Imgresp: ",imgresp);


       //here we are not allowing any kind of image or vidoeo response to get into post if the
       //user is not intentionall wanted to do so

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
    

    //here the resposne meant the user want to post but some error is occuring and as the user grievance is important and it should be less in numbers and more details so we won't upload any grievacne until the user able to post its media
      if (vidresp==-2 || imgresp==-2)
      {
        //add toast here as well
        console.log("Can't upload the media")
      }
    //   else{console.log(
    //     "post kar diya isse"
    //   )}
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
            <input type="file" className='m-2 w-[90%]' name='vidInput' onChange={handleVideoChange}/>

            <button
         type="button"
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700   m-2 dark:focus:ring-purple-900"><input type="submit" value="Post" /></button>

        </form>

        <div>
          
{/* 
           <video width="400" controls>
  <source src="" type="video/mp4">
  <source src="mov_bbb.ogg" type="video/ogg">

</video> */}

     
     {/* <video controls width="440" height="460">
        <source 
        src= {(base64String.vid != '')? ("data:video/mp4;base64,"+base64String.vid):"/videos/DataRetrieve.mp4"}
        type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
    

{/* <video   src= {(base64String.vid != '')? ("data:video/mp4;base64,"+base64String.vid):"/videos/DataRetrieve.mp4"}
controls width="440" height="460"
></video> */}
      {/* <img src="/vid.gif" alt="gif" /> */}
            {/* <img src=alt="goodImg" /> */}


               {/* <div className='m-5 flex'>
       <button
         type="button"
         onClick={imgRetrieve}
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">FetchImg</button>
 */}


         </div>
        </>
    )
}