import React from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { editComplaints, getAllComplaintAPI } from '../services/AllApi'
import { useState } from 'react'
import { SERVER_URL } from '../services/SeverURL'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Complaints() {
const [input,setinput]=useState('')

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const [img,setimg]=useState('')


    const [complaints, setcomplaints] = useState([])
    console.log(complaints);
    useEffect(() => {

        const handle = async () => {

            let result = await getAllComplaintAPI()

            setcomplaints(result.data)
        }
        handle()
    })
    
    const handle=(waste)=>{
        handleShow()
        setimg(waste)

      }
      const handleAproved=async(img)=>{
       
       const {complaint,complaintId,images,subject,userId,username}=img
          const  pendingStatus=true
       
       const reqBody =new FormData()
       reqBody.append("username",username)
       reqBody.append("subject",subject)
       reqBody.append("complaint",complaint)
       reqBody.append("images",images)
       reqBody.append("userId",userId)
       reqBody.append("complaintId",complaintId)
       reqBody.append("pendingStatus",pendingStatus)
       
       
       
     try{
        const result =await editComplaints(complaintId,reqBody)
        console.log(result);
        if(result.status==200){
        toast.success('Aproved')
        handleClose()
        }
     }catch(err){
       console.log(err);
     }
     
     
      }
   
    
    return (
        <div className="border px-3 table-responsive">
            <h1 className='text-center my-4'>All User ComplaintList</h1>
            <Table className='shadow ' striped bordered hover>
                <thead>
                    <tr>
                        <th>No:</th>
                        <th>complaintId</th>
                        <th>subject</th>
                        <th>Username</th>
                        <th className='text-center'>UserID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints?.map((waste, index) => (
                        <tr key={index}>

                            <td>{index + 1}</td>
                            <td>{waste.complaintId}</td>
                            <td>{waste.subject}</td>
                            <td>{waste.username}</td>
                            <td className='d-flex justify-content-around'>
                              {waste.userId}
                                </td>
                            {waste.pendingStatus?<td className='text-success'>Aproved</td>:<td className='text-danger'>Pending</td>}
                            <td><Button onClick={() => handle(waste)}>view More</Button></td>
                        </tr>

                    ))}
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{img.username}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className='w-100' src={`${SERVER_URL}/uploads/${img?.images}`} alt="" />
                            <h5> Complaint : {img.complaint}</h5>
                        </Modal.Body>
                        <Modal.Footer>
                       <div className='d-flex justify-content-around w-100'>
                       <Button className='btn-danger' variant="secondary" onClick={()=>handleAproved (img)}>
                                Aproved
                            </Button>
                            <input style={{display:"none"}} type="text" onChange={(e)=>setinput(e.target.value)} className='form-control' value={input}  readOnly />
                            <Button variant="secondary" onClick={handleClose}>
                                Delined
                            </Button>
                       </div>

                        </Modal.Footer>
                    </Modal>
                </tbody>
            </Table>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
 



                
                )
}

export default Complaints
