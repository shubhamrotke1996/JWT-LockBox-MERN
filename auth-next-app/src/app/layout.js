"use client";

import { usePathname, useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, {  useEffect, useState } from 'react';









export default function RootLayout({ children }) {
  const pathname = usePathname();
   const router = useRouter();
   const [isRedirecting , setIsRedirecting] = useState(false);
   
   const isAuthenticated = true;

   useEffect(()=>{
     if (isAuthenticated && ["/auth/login" , "/auth/signup"].includes(pathname)) {
         setIsRedirecting(true);
       setTimeout(()=>{
        router.push("/");
        setIsRedirecting(false);
       },100)  
         
     }
    
   },[isAuthenticated ,  pathname , router]);
  
  


  return (
    <html lang="en">
      <body>
     
    
        {children}
        <ToastContainer />
    
      </body>
    </html>
  );
}
