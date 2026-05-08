import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const ok = await login(formData.email, formData.password);
    if (ok) navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-dark relative z-10">
        <div className="w-full max-w-[440px] bg-dark-panel/60 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-slide-down">
          <div className="mb-8">
            <h2 className="font-heading text-3xl text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Log in to continue to your account.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-5 relative">
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <FiMail className="absolute left-3.5 top-[42px] text-slate-400 text-lg" />
              <input
                type="email" name="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange}
                className={`w-full bg-black/20 border ${errors.email ? 'border-red-500' : 'border-white/[0.08]'} text-white pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all focus:border-accent-violet focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] focus:bg-black/40 placeholder:text-slate-500`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5 animate-fade-in">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <FiLock className="absolute left-3.5 top-[42px] text-slate-400 text-lg" />
              <input
                type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password"
                value={formData.password} onChange={handleChange}
                className={`w-full bg-black/20 border ${errors.password ? 'border-red-500' : 'border-white/[0.08]'} text-white pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all focus:border-accent-violet focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] focus:bg-black/40 placeholder:text-slate-500`}
              />
              <button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[42px] text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {errors.password && <p className="text-red-400 text-xs mt-1.5 animate-fade-in">{errors.password}</p>}
            </div>

            <div className="text-right -mt-2 mb-5">
              <a href="#" className="text-sm text-accent-violet font-medium hover:text-violet-400 transition-colors">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-semibold py-3.5 rounded-xl cursor-pointer relative overflow-hidden transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] active:translate-y-px disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <p className="text-center mt-6 text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent-violet font-medium hover:text-violet-400 transition-colors">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel — Aurora */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-dark flex-col justify-center px-16">
        <div className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_#f43f5e_0%,_transparent_70%)] opacity-30 blur-[60px] animate-pulse-glow" />
        <div className="absolute bottom-0 -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_#8b5cf6_0%,_transparent_70%)] opacity-20 blur-[80px] animate-pulse-glow-slow" />

        <div className="relative z-10">
          <h1 className="font-heading text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-lg text-slate-400 max-w-[400px] leading-relaxed">
            We're thrilled to see you again. Sign in to access your dashboard and continue your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
