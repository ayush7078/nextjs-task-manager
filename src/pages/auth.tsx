import { useState } from 'react';
import Router from 'next/router';

interface AuthProps {
    onLogin: () => void; // Define the prop type
}

const Auth = ({ onLogin }: AuthProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(''); // Reset any previous error messages

        // Check if passwords match only on registration
        if (!isLogin && password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        const url = '/api/auth'; 

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: isLogin ? 'login' : 'register', email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                if (isLogin) {
                    localStorage.setItem('token', data.token); // Store the JWT token
                    onLogin(); // Call onLogin to notify the app of a successful login
                    Router.push('/home'); // Redirect to home page
                }
            } else {
                const error = await res.json();
                setErrorMessage(error.message); // Display error message from the server
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setErrorMessage("An error occurred. Please try again."); // General error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {isLogin ? 'Login' : 'Register'}
                </h1>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Confirm Password Field */}
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 text-blue-500 hover:underline"
                >
                    {isLogin ? 'Do not have an account? Register' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
