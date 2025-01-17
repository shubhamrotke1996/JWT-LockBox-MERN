



"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { handleSuccessToast, handleErrorToast } from "@/toastUtils";
import Link from "next/link";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((formData) => ({ ...formData, [name]: value }));

    console.log(loginInfo);

    console.log(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const {  email, password } = loginInfo;

    if ( !email || !password) {
       
        handleErrorToast("Please fill the form!")

      return;
    }

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log(result);

      const { success, message, error , token , user} = result;

      if (success) {
       handleSuccessToast(message);

       localStorage.setItem("jwttoken",token);
       localStorage.setItem("loginusername",user?.name);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleErrorToast(details);
      } else if (!success) {
        handleErrorToast(message);
      }

    } catch (error) {
      console.error(error);

      handleErrorToast("Failed to signup , Please try again later!");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100   ">
      <form onSubmit={handleLogin}>
        <div className="card border-dark mb-3">
           <h1 style={{ color: 'gray', fontSize: '32px', textAlign: 'center' }}>Login</h1> 
          {/* input name   */}
          

          {/* input email   */}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="Form-label">
              Email address
            </label>
            <input
              onChange={handleOnChange}
              name="email"
              value={loginInfo.email}
              className="Form-control"
              id="exampleFormControlInput1"
              autoComplete="FormControlInput1"
              placeholder="name@example.com"
            />
          </div>

          {/* input password   */}

          <div>
            <div className="mb-3">
              <label htmlFor="inputPassword6" className="col-htmlForm-label">
                Password
              </label>
            </div>
            <div className="mb-3">
              <input
                onChange={handleOnChange}
                name="password"
                value={loginInfo.password}
                id="inputPassword6"
                autoComplete="inputPass"
                className="htmlForm-control"
                aria-describedby="passwordHelpInline"
              />
            </div>
            <div>
              {/* <span id="passwordHelpInline" className="htmlForm-text">
    Must be 8-20 characters long.
    </span> */}
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
          
          <span>Don't have an account? <Link href="/auth/signup">signup</Link> </span>
        </div>
      </form>   
    </div>
  );
}

export default Login;


