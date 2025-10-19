import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowLeft, Loader2, CheckCircle, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    organization: string;
};

type UserData = Omit<FormData, 'confirmPassword'>;

export default function CreateAccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        organization: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName) {
            setError('Please enter your full name');
            return false;
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (!formData.role) {
            setError('Please select your role');
            return false;
        }
        if (!formData.organization) {
            setError('Please enter your organization');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const userData: UserData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                organization: formData.organization
            };

            const existingUsers = JSON.parse(localStorage.getItem('disasterAI_users') || '[]');

            if (existingUsers.some((user: UserData) => user.email === userData.email)) {
                setError('An account with this email already exists');
                setLoading(false);
                return;
            }

            existingUsers.push(userData);
            localStorage.setItem('disasterAI_users', JSON.stringify(existingUsers));

            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        'Emergency Responder',
        'Disaster Manager',
        'Medical Professional',
        'Government Official',
        'NGO Representative',
        'Technical Specialist',
        'Volunteer Coordinator'
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="container mx-auto px-6 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-3">
                            Create Your Account
                        </h1>
                        <p className="text-slate-400 text-lg">Join our network of disaster response professionals</p>
                    </div>

                    {/* Form Card */}
                    <div className="relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">

                        <div className="relative z-10 p-8 md:p-12">
                            {success ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-12 h-12 text-emerald-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Account Created Successfully!</h2>
                                    <p className="text-slate-400 mb-6">Redirecting you to the dashboard...</p>
                                    <div className="w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
                                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-full w-full animate-pulse"></div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-red-300 text-sm">{error}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-3">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                                                placeholder="John"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-3">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-3">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 transition-all"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-3">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-3">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-3">
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all appearance-none"
                                            required
                                        >
                                            <option value="" className="bg-slate-900 text-slate-400">Select your role</option>
                                            {roles.map(role => (
                                                <option key={role} value={role} className="bg-slate-900 text-white">{role}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="organization" className="block text-sm font-medium text-slate-300 mb-3">
                                            Organization
                                        </label>
                                        <input
                                            type="text"
                                            id="organization"
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                                            placeholder="Your organization name"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all ${loading
                                            ? 'bg-slate-700 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                                            }`}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>

                                    <div className="text-center pt-4">
                                        <p className="text-slate-400 text-sm">
                                            Already have an account?{' '}
                                            <Link to="/response-coordination" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                                Sign in here
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <p className="text-slate-400 text-sm text-center">
                            By creating an account, you agree to join our disaster response network. Your information will be used to coordinate emergency response and provide critical safety updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}