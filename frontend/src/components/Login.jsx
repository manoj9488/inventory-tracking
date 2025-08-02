import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/login/user", {
                email: Email,
                password: password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, 
            });

            const result = response.data;
            console.log(result);

            const role = result.user?.role;

            if (role === "Admin") {
                navigate("/admindashboard");
            } else if (role === "User") {
                navigate("/dashboard");
            } else {
                alert("Login failed: Unknown role");
            }
        } catch (err) {
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            alert(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
                {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}
            </div>
        </div>
    );
}
