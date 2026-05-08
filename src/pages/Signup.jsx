import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 5) score++;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return Math.min(4, score);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setPasswordStrength(checkPasswordStrength(value));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    else if (formData.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const ok = await signup(formData.name, formData.email, formData.password);
    if (ok) navigate('/dashboard');
    setLoading(false);
  };

  const strengthColors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-400', 'bg-emerald-500'];
  const strengthTextColors = ['text-red-500', 'text-orange-400', 'text-yellow-400', 'text-emerald-400', 'text-emerald-500'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel — Aurora */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-dark flex-col justify-center px-16">
        {/* Glow orbs */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_#06b6d4_0%,_transparent_70%)] opacity-30 blur-[60px] animate-pulse-glow" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_#8b5cf6_0%,_transparent_70%)] opacity-20 blur-[80px] animate-pulse-glow-slow" />

        <div className="relative z-10">
          <h1 className="font-heading text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Join the Future
          </h1>
          <p className="text-lg text-slate-400 max-w-[400px] leading-relaxed">
            Create your GuidEx account and experience a seamless, secure, and beautiful platform tailored for you.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-dark relative z-10">
        <div className="w-full max-w-[440px] bg-dark-panel/60 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-slide-down">
          <div className="mb-8">
            <h2 className="font-heading text-3xl text-white mb-2">Create Account</h2>
            <p className="text-slate-400 text-sm">Enter your details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-5 relative">
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <FiUser className="absolute left-3.5 top-[42px] text-slate-400 text-lg" />
              <input
                type="text" name="name" placeholder="John Doe"
                value={formData.name} onChange={handleChange}
                className={`w-full bg-black/20 border ${errors.name ? 'border-red-500' : 'border-white/[0.08]'} text-white pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all focus:border-accent-violet focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] focus:bg-black/40 placeholder:text-slate-500`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5 animate-fade-in">{errors.name}</p>}
            </div>

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
                type={showPassword ? 'text' : 'password'} name="password" placeholder="Create a strong password"
                value={formData.password} onChange={handleChange}
                className={`w-full bg-black/20 border ${errors.password ? 'border-red-500' : 'border-white/[0.08]'} text-white pl-11 pr-11 py-3 rounded-xl text-sm outline-none transition-all focus:border-accent-violet focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] focus:bg-black/40 placeholder:text-slate-500`}
              />
              <button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-[42px] text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>

              {formData.password && (
                <div className="mt-2.5 flex flex-col gap-1.5">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-all ${passwordStrength > i ? strengthColors[passwordStrength] : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold text-right ${strengthTextColors[passwordStrength]}`}>
                    {strengthLabels[passwordStrength]}
                  </span>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-xs mt-1.5 animate-fade-in">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-accent-violet to-accent-cyan text-white font-semibold py-3.5 rounded-xl cursor-pointer relative overflow-hidden transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(139,92,246,0.4)] active:translate-y-px disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
              {loading ? 'Creating...' : 'Sign Up'}
            </button>

            <p className="text-center mt-6 text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-violet font-medium hover:text-violet-400 transition-colors">Log in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
