"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleSuccessToast, handleErrorToast } from "@/toastUtils";



export default function Home() {

       const router = useRouter();
    
      const [loginusername , setLoginusername] = useState(" ");

      const [products , setProducts] = useState([]);

      const handleLogout = () =>{
       setLoginusername( localStorage.removeItem("loginusername" ) );
       setLoginusername( localStorage.removeItem("jwttoken" ) );

       handleSuccessToast("you Logged out successfully");

       setTimeout(()=>{
           router.push("/auth/signup");
       },1000)
      }
      
      useEffect(()=>{
        setLoginusername(localStorage.getItem("loginusername"));
      },[])


      //  getting products information

      const fetchProducts = async () => {
        try {
          const token = localStorage.getItem("jwttoken"); // Retrieve the token from localStorage
          
          console.log("Token from localStorage:", localStorage.getItem("jwttoken"));

          if (!token) {
            handleErrorToast("Authentication failed. Please log in again.");
            router.push("/auth/login");
            return;
          }
      
          const url = "http://localhost:5000/products";
          const headers = {
            headers: {
              Authorization: `Bearer ${token}`, // Correctly include the token
            },
          };

          console.log("Authorization header:", `Bearer ${token}`);

      
          const response = await fetch(url, headers);
          const data = await response.json();
          console.log(data);
      
          setProducts(Array.isArray(data)? data : []);

        } catch (err) {
          handleErrorToast("Failed to fetch products");
          console.error(err);
        }
      };
      
      useEffect(()=>{
        fetchProducts();
      },[])
       

  return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center" , height:"100vh" , flexDirection:"column"}}>
        
   
        <h1 style={{color:"royalblue"}}>{loginusername}</h1>
        <button onClick={handleLogout}>Logout</button>  

        <div>

        {
         products && products.map(( item )=>{
           return (
              <div key={item.id}>
                    <span>{item.name}:{item.price}</span>

                  </div>)
          
        }) }

        </div>
         
        </div>
  ); 
}
