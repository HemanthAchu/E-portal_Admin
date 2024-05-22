import React, { useEffect, useState} from 'react'
import { Button, } from 'react-bootstrap';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { onlineMarketAPI } from '../services/AllApi';
import {Link} from 'react-router-dom'
function connect() {

  const [priview, setpriview] = useState("https://imgs.search.brave.com/91JZE7B_vRNc1Dxv5Z9aKbbAIHQLHNZQKoJKMuZ-lZI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/ZnJhbmtzb3V6YTE4/My9mcy8xMjgvUGxh/Y2VzLXVzZXItaW1h/Z2UtaWNvbi5wbmc")
  const [product, setproduct] = useState({
    productname:"",
    productsubname:"",
    totalprice:"",
    offer:"",
    images:"",
    count:0,
    
  })
 
  useEffect(() => {
    if (product.images) {
      const imageURL = URL.createObjectURL(product.images);
      setpriview(imageURL);
    }
  }, [product.images]);

   
      const time = new Date().getTime()
      
 
  const handleUpload=async()=>{
    setproduct({...product,productId:time.toString()})

    const {productname,productsubname,totalprice,offer,images,count}=product
   if(!productname || !productsubname || !totalprice  || !offer || !images ||count ){
    
     toast.warning("plz fill completely")

   }else{
    //api call
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      
    }
const reqBody =new FormData()
reqBody.append("productname",productname)
reqBody.append("productsubname",productsubname)
reqBody.append("totalprice",totalprice)
reqBody.append("offer",offer)
reqBody.append("images",images)
reqBody.append("count",count)




    const result=await onlineMarketAPI(reqBody,reqHeader)
    
    console.log(result);
try{
  if(result.status==200){
    toast.success("sucess")
    setproduct({
      productname:"",
      productsubname:"",
      totalprice:"",
      offer:"",
      images:"",
      count:0,
      
    })
    setpriview("https://imgs.search.brave.com/91JZE7B_vRNc1Dxv5Z9aKbbAIHQLHNZQKoJKMuZ-lZI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pY29u/cy5pY29uYXJjaGl2/ZS5jb20vaWNvbnMv/ZnJhbmtzb3V6YTE4/My9mcy8xMjgvUGxh/Y2VzLXVzZXItaW1h/Z2UtaWNvbi5wbmc")
  }
}catch(err){
 console.log(err);
}

   }
  }
  console.log(product);
  return(
    <div className='conatainer mt-4' style={{height:"fit-content"}}>
      <Button className='ms-5 my-2'><Link to={'/lists'}  style={{textDecoration:"none"}}  >List</Link></Button>
      <div className='w-100  p-5  d-flex justify-content-center align-items-center ' style={{ height: "80vh" }} >
        <div className='w-100' style={{ height:"fit-content"}}>
          <div >
            <h3> Location:</h3> <input value={product.productname}  onChange={(e)=>setproduct({...product,productname:e.target.value})} type="text" className='form-control' placeholder='Location' />
            <h3>Date:</h3> <input value={product.productsubname}  onChange={(e)=>setproduct({...product,productsubname:e.target.value})} type="date" className='form-control' placeholder='Sub Title' />
            <h3>Subject:</h3> <input value={product.totalprice}  onChange={(e)=>setproduct({...product,totalprice:e.target.value})} type="text" className='form-control' placeholder='sucess Note' />
            <h3>Complante UserName:</h3> <input value={product.offer}  onChange={(e)=>setproduct({...product,offer:e.target.value})} type="text" className='form-control' placeholder='Username'/>
         

            <label className='d-flex justify-content-around align-items-center mt-3' >

            <input style={{display:"none"}}  className='form-control' type="file"  onChange={(e)=>setproduct({...product,images:e.target.files[0]})}/>
{/* <form id='form' encType='multipart/form-data'>


<input id='file' type="file" style={{ display: 'none' }}

onChange={(e) => setproduct({ ...product, images: e.target.files[0] })}
/>
</form> */}
             

              <img style={{ height: "100px" }} className='img-fluid' src={priview} alt="input image"/>
            </label>


          <center> <Button onClick={handleUpload} className='btn text-center'>Upload</Button></center>
          </div>
          <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
      </div>
    </div>
  )
}

export default connect

