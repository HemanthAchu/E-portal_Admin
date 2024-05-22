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

export const onlineMarketAPI =async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/onlinemarket`,reqBody,reqHeader)
}
export const getproduct=async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/onlines`,reqHeader)
}
export const deleteproduct=async(id)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/deleteitem/${id}`,)
}

export const DeleteComent =async(id)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/deleteComent/${id}`)
}