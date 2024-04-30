import React from 'react'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { editwaste, getAllWastereporttAPI } from '../services/AllApi';
import { useState } from 'react';
import { SERVER_URL } from '../services/SeverURL';
import Table from 'react-bootstrap/Table';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-bootstrap/Modal';
function wastereport() {
  const [show, setShow] = useState(false);
  const [vid, setvid] = useState('')

  const [shows, setShows] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const [img, setimg] = useState('')
  const [complaints, setcomplaints] = useState([])
  useEffect(() => {

    const handle = async () => {

      const result = await getAllWastereporttAPI()

      setcomplaints(result.data)
    }
    handle()
  })

 

  const handle = (waste) => {
    handleShow()
    setimg(waste)

  }

  const handconnect = async (waste) => {
    setvid(waste)
    const pendingStatus = true
    const { location, date,
      username, usersId, wasteId, wastetype } = waste
    const reqBody = new FormData()
    reqBody.append("location", location)
    reqBody.append("date", date)
    reqBody.append("pendingStatus", pendingStatus)
    reqBody.append("username", username)
    reqBody.append("usersId", usersId)
    reqBody.append("wasteId", wasteId)
    reqBody.append("wastetype", wastetype)

    try {
      const result = await editwaste(wasteId, reqBody)
      console.log(result);
      if (result.status == 200) {
        toast.success('Aproved')

      }
    } catch (err) {
      console.log(err);
    }

  }



  return (
    <div className='container shadow'>

<h1 className='text-center my-4'>Users WasteReport</h1>


      <div className='col-lg-12'>
        <div className="table-responsive"> {/* Wrap the table inside a div with class "table-responsive" */}
          <Table className='shadow' striped bordered hover>
            <thead>
              <tr>
                <th>No:</th>
                <th>Report By</th>
                <th>Location</th>
                <th>Date</th>
                <th>WasteType</th>
                <th className='text-center'>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints?.map((waste, index) => (
                <tr key={index}>

                  <td>{index + 1}</td>
                  <td>{waste.username}</td>
                  <td>{waste.location}</td>
                  <td>{waste.date}</td>
                  <td>{waste.wastetype}</td>
                  <td className='d-flex justify-content-center'>
                    <img onClick={() => handle(waste)} className='shadow' style={{ width: "50px", height: "50px" }} src={`${SERVER_URL}/uploads/${waste?.images}`} alt="image" />
                  </td>
                  {waste.pendingStatus ? <td className='text-center text-success'>Aproved</td> : <td className='text-center text-danger'>pending</td>}
                  <td><Button onClick={() => handconnect(waste)} >Connect</Button></td>
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
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>

                </Modal.Footer>
              </Modal>

            </tbody>
          </Table>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>

  )
}

export default wastereport
