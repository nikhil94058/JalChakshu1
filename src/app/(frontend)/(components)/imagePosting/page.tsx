
'use client'

import {useState} from 'react'
// import link from 
export default function ImgUpload()
{
    const [Files,setFiles] = useState<File>();
    // const [Image,setImage] = useState<File>();
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

         if(!Files) return;

         try {
            
             const data = new FormData();
             data.set('file',Files);
                //till here everyting is fine
            //  console.log("heavyData: ",data.get('file'));

                const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/upload/uploadImg',{
                method:'post',
                body:data
            });

            console.log("response: ",await response.json());

            if(response.ok)
            {
                //or I can show some css toasts here 
                console.log("Image uploaded successfull!")
            }
            else{
                console.log("Image upload failed");
            }

         } catch (e:Error) {
            console.log("error while uploading: ",e.message);
         }
       

    }

    //FUNCTION for video upload
    const VideoUpload=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

         if(!Files) return;

         try {
            
             const data = new FormData();
             data.set('file',Files);
             console.log("files: ",Files)
                //till here everyting is fine
            //  console.log("heavyData: ",data.get('file'));

                const response = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/upload/uploadVid',{
                method:'post',
                body:data
            });

            console.log("response: ",await response.json());
            
            if(response.ok)
            {
                //or I can show some css toasts here 
                console.log("Image uploaded (video) successfull!")
            }
            else{
                console.log("Image upload failed");
            }

         } catch (e:Error) {
            console.log("error while uploading: ",e);
         }
       

    }

    return(
        <>
        <form onSubmit={VideoUpload} >
            <input type="file" name="imgInput" 
            onChange={(e)=> setFiles(e.target.files?.[0])}
             id="imgInput" />
           <button
         type="button"
         className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><input type="submit" value="Upload" /></button>


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

     
     {/* <video controls width="440" height="460">
        <source 
        src= {(base64String.vid != '')? ("data:video/mp4;base64,"+base64String.vid):"/videos/DataRetrieve.mp4"}
        type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
     {/* <video controls width="440" height="460">
        <source 
        src= {(base64String.vid != '')? ("data:video/mp4;base64,"+base64String.vid):"/videos/DataRetrieve.mp4"}
        type="video/mp4" />
        Your browser does not support the video tag.
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