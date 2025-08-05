import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Shield,Zap,Radio,UserPlus,Brain} from 'lucide-react';

function StatCard({value,label}: {value: string; label: string}) {
    return (
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-xl shadow-lg border border-blue-800 transform hover:scale-105 transition-transform">
            <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
            <p className="text-blue-200 font-medium">{label}</p>
        </div>
    );
}

function HomePage() {
    const navigate=useNavigate();
    const [isScrolled,setIsScrolled]=useState(false);
    const [activeSection,setActiveSection]=useState('');

    useEffect(() => {
        const handleScroll=() => {
            setIsScrolled(window.scrollY>50);
        };

        window.addEventListener('scroll',handleScroll);
        return () => window.removeEventListener('scroll',handleScroll);
    },[]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled? 'bg-white shadow-md py-2':'bg-transparent py-4'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Shield className="w-8 h-8 text-blue-600" />
                            <Zap className="w-4 h-4 text-yellow-400 absolute -right-1 -bottom-1" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">
                                Disaster<span className="text-blue-600">AI</span>
                            </h1>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">PREDICTIVE RESPONSE SYSTEM</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={() => {
                                setActiveSection('features');
                                document.getElementById('features')?.scrollIntoView({behavior: 'smooth'});
                            }}
                            className={`px-3 py-2 font-medium ${activeSection==='features'? 'text-blue-600 border-b-2 border-blue-600':'text-gray-700 hover:text-blue-600'}`}
                        >
                            Features
                        </button>
                        <button
                            onClick={() => {
                                setActiveSection('technology');
                                document.getElementById('technology')?.scrollIntoView({behavior: 'smooth'});
                            }}
                            className={`px-3 py-2 font-medium ${activeSection==='technology'? 'text-blue-600 border-b-2 border-blue-600':'text-gray-700 hover:text-blue-600'}`}
                        >
                            Technology
                        </button>
                        <button
                            onClick={() => {
                                setActiveSection('about');
                                document.getElementById('about')?.scrollIntoView({behavior: 'smooth'});
                            }}
                            className={`px-3 py-2 font-medium ${activeSection==='about'? 'text-blue-600 border-b-2 border-blue-600':'text-gray-700 hover:text-blue-600'}`}
                        >
                            About
                        </button>
                        <button
                            onClick={() => navigate('/response-coordination')}
                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Radio className="w-5 h-5" />
                            <span>Emergency Access</span>
                        </button>
                        <button
                            onClick={() => navigate('/create-account')}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span>Create Account</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/50"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            AI-Powered Disaster Prevention & Response
                        </h1>
                        <p className="text-xl text-blue-100 mb-8">
                            Leveraging advanced AI to predict, prevent, and respond to natural disasters.
                            Saving lives through early warning systems and intelligent resource management.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/create-account')}
                                className="flex items-center space-x-2 bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Join Now</span>
                            </button>
                            <button
                                onClick={() => navigate('/learn-more/prediction')}
                                className="flex items-center space-x-2 bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                <Brain className="w-5 h-5" />
                                <span>Learn More</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard value="15min" label="Average Response Time" />
                        <StatCard value="24/7" label="Real-time Monitoring" />
                        <StatCard value="500+" label="Active Sensors" />
                        <StatCard value="12+" label="Risk Factors Analyzed" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;