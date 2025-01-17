"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { handleSuccessToast, handleErrorToast } from "@/toastUtils";
import Link from "next/link";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo((formData) => ({ ...formData, [name]: value }));

    console.log(signupInfo);

    console.log(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
       
        handleErrorToast("Please fill the form!")

      return;
    }

    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      console.log(result);

      const { success, message, error , token , user } = result;

      if (success) {
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleErrorToast(details);
      } else if (!success) {
        handleErrorToast(message);
      }

      handleSuccessToast(message);
    } catch (error) {
      console.error(error);

      handleErrorToast("Failed to signup , Please try again later!");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100   ">
      <form onSubmit={handleSignup}>
        <div className="card border-dark mb-3">
           <h1 style={{ color: 'gray', fontSize: '32px', textAlign: 'center' }}>Signup</h1> 
          {/* input name   */}
          <div className="mb-3">
            <label htmlFor="inputName" className="col-htmlForm-label">
              Name
            </label>
            <input
              type="text"
              onChange={handleOnChange}
              name="name"
              id="inputName"
              autoComplete="inputN"
              value={signupInfo.name}
              aria-label="Dollar amount (with dot and two decimal places)"
            />
          </div>

          {/* input email   */}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="Form-label">
              Email address
            </label>
            <input
              onChange={handleOnChange}
              name="email"
              value={signupInfo.email}
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
                value={signupInfo.password}
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

          <button type="submit" className="btn btn-outline-success">
            Sign In
          </button>
          <span>already have an account?<Link href="/auth/login">login</Link></span>
          
        </div>
      </form>
    </div>
  );
}

export default Signup;
