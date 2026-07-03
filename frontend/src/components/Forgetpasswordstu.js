import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Forgetpasswordstu.css';  // Ensure this file exists and is styled appropriately
import forgpassImage from '../assets/forgotpassword.png';  // Ensure this file path is correct

// Configure Axios base URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/staffportal';

const ForgotPassword = ({ setView }) => {
    const [step, setStep] = useState('request'); // 'request', 'verify', or 'reset'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const validateResetPassword = () => {
        const newErrors = { ...errors };
        let isValid = true;

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        } else {
            newErrors.confirmPassword = '';
        }

        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else {
            newErrors.newPassword = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/verifyemail/', { email });
            setMessage(response.data.message);
            setStep('verify');
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/verifyotp/', { email, otp });
            setMessage(response.data.message);
            setStep('reset');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setMessage(error.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!validateResetPassword()) return; // Only proceed if validation passes

        setLoading(true);
        try {
            const response = await axios.put(`/change-password/${email}/`, { password: newPassword });
            setMessage(response.data.message);
            setStep('request'); // Reset step back to 'request' after successful password reset
            setEmail('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <img src={forgpassImage} alt="Forgot Password" className="forgot-password-image" />
            {step === 'request' && (
                <div className="forgot-password-form">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleRequestOTP}>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder='Enter your email address'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                </div>
            )}

            {step === 'verify' && (
                <div className="forgot-password-form">
                    <h2>Verify OTP</h2>
                    <form onSubmit={handleVerifyOTP}>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder='Enter your email address'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled 
                        />
                        <label>OTP:</label>
                        <input 
                            type="text" 
                            placeholder='Enter OTP'
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            required 
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                </div>
            )}

            {step === 'reset' && (
                <div className="forgot-password-form">
                    <h2>Reset Password</h2>
                    <form onSubmit={handleResetPassword}>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            placeholder='Enter your email address'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled 
                        />
                        <label>New Password:</label>
                        <div className="password-field">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='New password'
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                            />
                            <i 
                                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} 
                                onClick={() => setShowPassword(!showPassword)} 
                            ></i>
                        </div>
                        {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
                        <label>Confirm Password:</label>
                        <div className="password-field">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='Confirm new password'
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                            <i 
                                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-icon`} 
                                onClick={() => setShowPassword(!showPassword)} 
                            ></i>
                        </div>
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            )}

            <p>{message}</p>
        </div>
    );
};

export default ForgotPassword;
