import { commonAPI } from "./Common"
import { SERVER_URL } from "./SeverURL"

export const getAllComplaintAPI =async()=>{
    return await commonAPI('GET',`${SERVER_URL}/allcomplaints`,"")
}


export const getAllWastereporttAPI =async()=>{
    return await commonAPI('GET',`${SERVER_URL}/allwasteReport`,"")
}

export const editComplaints =async(complaintId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/editComplaint/${complaintId}`,reqBody,reqHeader)
}


export const editwaste =async(wasteId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/editwaste/${wasteId}`,reqBody,reqHeader)
}