import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // ✅ back icon
import Logo from '@/images/Logo.png'; // ✅ your logo path

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add login logic
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-200 px-4">

{/* ✅ Navbar-style top-left with Back + Logo */}
<div className="absolute top-0 left-0 w-full flex items-center justify-start px-6 py-3 bg-white/70 backdrop-blur-md shadow-md z-50">
  <button onClick={() => navigate(-1)} className="text-black hover:text-gray-700 transition">
    <IoArrowBack size={24} />
  </button>
  <img src={Logo} alt="Logo" className="h-7 md:h-9 ml-3" />
</div>


      {/* 🔒 Login Card */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn">

        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Welcome Back!</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-orange-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-orange-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-sm text-center text-gray-600">
          <Link to="#" className="text-orange-500 hover:underline">Forgot password?</Link>
        </div>
        <div className="mt-2 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="#" className="text-orange-500 font-semibold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
