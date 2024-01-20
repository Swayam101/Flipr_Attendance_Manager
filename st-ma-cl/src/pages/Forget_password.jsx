import React, { useRef } from "react";


const ForgetPassword = () => {
    const emailRef = useRef();

    const handleContinue = () => {
        // Add logic to handle the "Continue" button click
        const userEmail = emailRef.current.value;
        // Add your logic here to handle the email address (e.g., send a reset link)
        console.log("Continue button clicked. Email:", userEmail);
    };

    return (
        <div className="main forget_Password_wrapper">
            <div className="forget-password-container">
                <h3 className="mt-2">Forget Password</h3>
                <p>Enter your email address</p>

                <div className="forget-password-form">
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="forget-input"
                    />
                    <button className="continue-btn" onClick={handleContinue}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
