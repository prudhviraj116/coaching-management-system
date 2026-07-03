// CombinedPasswordResetPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState('request'); // 'request', 'verify', or 'reset'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/verifyemail/', { email });
            setMessage(response.data.message);
            setStep('verify'); // Move to OTP verification step
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/verifyotp/', { email, otp });
            setMessage(response.data.message);
            setStep('reset'); // Move to reset password step
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/change-password/${email}/`, { password: newPassword });
            setMessage(response.data.message);
            navigate('/login'); // Redirect to login or another page
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            {step === 'request' && (
                <div>
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleRequestOTP}>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <button type="submit">Send OTP</button>
                    </form>
                </div>
            )}

            {step === 'verify' && (
                <div>
                    <h2>Verify OTP</h2>
                    <form onSubmit={handleVerifyOTP}>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled 
                        />
                        <label>OTP:</label>
                        <input 
                            type="text" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            required 
                        />
                        <button type="submit">Verify OTP</button>
                    </form>
                </div>
            )}

            {step === 'reset' && (
                <div>
                    <h2>Reset Password</h2>
                    <form onSubmit={handleResetPassword}>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled 
                        />
                        <label>New Password:</label>
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                        />
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            )}

            <p>{message}</p>
        </div>
    );
};

export default ForgotPassword;
