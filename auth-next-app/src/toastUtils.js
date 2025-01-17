"use client";


import { toast } from "react-toastify";



export  const handleSuccessToast = (message)=>{
    toast.success(message , {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
}


export  const handleErrorToast = (message) =>{
    toast.error(message , {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
}