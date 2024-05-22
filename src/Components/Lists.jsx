import React, { useEffect, useState } from 'react'
import { DeleteComent, deleteproduct, getproduct } from '../services/AllApi'
import { SERVER_URL } from '../services/SeverURL'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

function Lists() {
const[ad,setsd]=useState([])
  const [shows, setShows] = useState(false);

  const handleCloses = () =>{ 
    setShows(false)
    setsd([])
  }
  const handlecomment = (admin) =>{ setShows(true)
  

   const arr=JSON.parse(JSON.stringify(admin))
     setsd(arr)
     
  }


    const [show, setShow] = useState(false);
const [modal,setmodal]=useState([])
    const handleClose = () => setShow(false);
    const handleShow = (admin) =>{
        setmodal(admin)
        setShow(true);}

    const [statuss, setstatuss] = useState([])
    const [delet,setdelet]=useState('')
    useEffect(() => {
        const handleget = async () => {
            const token = sessionStorage.getItem("token")

            const reqHeader = {

                "Authorization": `Bearer ${token}`
            }

            const result = await getproduct(reqHeader)
            

console.log(result.data);
            setstatuss(result.data)
        }
        handleget()
    }, [delet])

    const handledelete=async(e)=>{
await deleteproduct(e)
setdelet(results)
    }

const handlecomentDelete =async()=>{
console.log(ad._id);
const results =  await DeleteComent(ad._id)
}

console.log(ad.coment);
  return (
    <div className='container'>
    <h1 className='text-center my-3'>Admin <span className='text-danger'>Update</span>,All Success result of  User Complaints</h1>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">No:</th>
                <th scope="col">Place</th>
                <th scope="col">Date</th>
                <th scope="col"> Compliant subject</th>
                <th scope="col">image</th>
                <th scope='col'> UserName</th>
                <th scope='col'>USerComent</th>
                <th scope='col'>USerLikes</th>
                <th scope='col'>Delete</th>
            </tr>
        </thead>
        <tbody>
            {statuss?.map((admin,index) => (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{admin.productname}</td>
                    <td>{admin.productsubname}</td>
                    <td>{admin.totalprice}</td>
                    <td><img onClick={()=>handleShow(admin)} style={{height:"50px",width:"50px"}} src={`${SERVER_URL}/uploads/${admin?.images}`} alt=""/></td>
                    <td>{admin.offer}</td>
                    <td><Button onClick={()=>handlecomment(admin)} >comment</Button></td>
                    <td><Button disabled ><i class="fa-regular fa-thumbs-up"></i><Badge className='ms-1' bg="secondary">{admin.count}</Badge></Button></td>
                    <td><Button onClick={()=>handledelete(admin._id)} >delete</Button></td>
                </tr>

            ))}
             <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <img className='w-100' src={`${SERVER_URL}/uploads/${modal?.images}`} alt="" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>


      <Modal
        show={shows}
        onHide={handleCloses}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Users Comment List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-between'><h2>comments</h2> <Button onClick={()=>handlecomentDelete(ad)} className='btn-danger'>Delete</Button></div>
 
          
          
          {ad.coment?.map((items,index)=>(
            <div key={index} className='d-flex'>
          <> <span className='text-danger'>{items.username} </span>:</>
          <p className='ms-1'>{items.coments}</p>
          </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloses}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


        </tbody>
    </table>
</div>
  )
}

export default Lists
