import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
    Brain, Command, Shield, Zap,
    Radio, ChevronRight,
    Satellite, Radar,
    AlertTriangle,
    BarChart3
} from 'lucide-react';
import Prediction from './pages/Prediction';
import PredictionResults from './pages/PredictionResults';
import HeatwavePrediction from './pages/HeatwavePrediction';
import HeatwaveResult from './pages/HeatwaveResult';
import FloodPrediction from './pages/FloodPrediction';
import FloodResult from './pages/FloodResult';
import LearnMore from './pages/LearnMore';
import ResponseCoordination from './pages/ResponseCoordination';
// import CaseStudies from './components/CaseStudies';
// import ResponseCoordinationLogin from './pages/ResponseCoordinationLogin';
// import CreateAccount from './pages/CreateAccount';
// import PopulationSafety from './pages/PopulationSafety';
// import PopulationSafetyResults from './pages/PopulationSafetyResults';
// // import AuthGuard from './components/AuthGuard';
// import GeospatialAnalysis from './pages/GeospatialAnalysis';
// import GeospatialResults from './pages/GeospatialResults';
// import DataAnalytics from './pages/DataAnalytics';
// import DataAnalyticsResults from './pages/DataAnalyticsResults';
// import EmergencyNotifications from './components/EmergencyNotifications
import './App.css';
import './App2.css';
// import './new.css';
import Footer from './styles/Footer';

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-yellow-400/20">
            <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
            <p className="text-yellow-400">{label}</p>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
    const navigate = useNavigate();

    const handleClick = () => {
        switch (title) {
            case "Real-time Prediction":
                navigate('/prediction');
                break;
            case "Response Coordination":
                navigate('/response-coordination');
                break;
            case "Heatwave Prediction":
                navigate('/heatwave-prediction');
                break;
            case "Early Warning System":
                navigate('/learn-more/early-warning');
                break;
            case "Geospatial Analysis":
                navigate('/geospatial-analysis');
                break;
            case "Data Analytics":
                navigate('/data-analytics');
                break;
            case "Flood Prediction":
                navigate('/flood-prediction');
                break;
            default:
                console.log(`Clicked on ${title}`);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-900 text-left w-full transform hover:-translate-y-1 hover:border-[#E63946]"
        >
            <div className="w-12 h-12 bg-blue-900/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#E63946]/10 transition-colors">
                <Icon className="w-6 h-6 text-blue-900 group-hover:text-[#E63946] transition-colors" />
            </div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-900 group-hover:text-[#E63946] transition-colors">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#E63946] transform group-hover:translate-x-1 transition-all" />
            </div>
        </button>
    );
}

function HomePage() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [showMobileMenu] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Lock scroll when mobile menu is open
        // Lock/unlock scroll when mobile menu is toggled
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'visible';
            document.body.style.position = 'static';
        }
    }, [showMobileMenu]);


    return (
        <div className="disaster-ai-container">
            {/* Navigation with Logo */}
            <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <Shield className="shield-icon" />
                            <Zap className="zap-icon" />
                        </div>
                        <div className="logo-text">
                            <h1 className="logo-title">
                                Resilience<span className="highlight">AI</span>
                            </h1>
                            <p className="logo-subtitle">PREDICTIVE RESPONSE SYSTEM</p>
                        </div>
                    </div>

                    <div className="nav-links">
                        <button
                            onClick={() => {
                                setActiveSection('features');
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`nav-button ${activeSection === 'features' ? 'active' : ''}`}
                        >
                            Features
                        </button>
                        <button
                            onClick={() => {
                                setActiveSection('technology');
                                document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`nav-button ${activeSection === 'technology' ? 'active' : ''}`}
                        >
                            Technology
                        </button>
                        {/* <button
                            onClick={() => {
                                setActiveSection('about');
                                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
                        >
                            About
                        </button> */}
                        <button
                            onClick={() => navigate('/response-coordination')}
                            className="emergency-button frontbtn2"
                        >
                            <Radio className="button-icon " />
                            Emergency Access
                        </button>
                        {/* <button
                            onClick={() => navigate('/create-account')}
                            className="account-button"
                        >
                            <UserPlus className="button-icon" />
                            Create Account
                        </button> */}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-background">
                    <img
                        src="https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?auto=format&fit=crop&w=2000&q=90"
                        alt="Satellite view of hurricane"
                        className="hero-image"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            AI-Powered Disaster Prediction & Response
                        </h1>
                        <p className="hero-subtitle">
                            Utilizing ML models and AI-driven response to predict and alert natural disasters.
                            Saving lives through early warning systems and intelligent resource management.
                        </p>
                        <div className="hero-buttons">
                            {/* <button
                                onClick={() => navigate('/create-account')}
                                className="join-button"
                            >
                                <UserPlus className="button-icon" />
                                Join Now
                            </button> */}
                            <button
                                onClick={() => navigate('/learn-more/prediction')}
                                className="learn-button frontbtn"
                            >
                                <Brain className="button-icon " />
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
                <div className="stats-container">
                    <StatCard value="15min" label="Average Response Time" />
                    <StatCard value="95% +" label="Average Prediction Accuracy" />
                    <StatCard value="2" label="Disaster Type Covered" />
                    <StatCard value="20+" label="Natural Factors Analyzed" />
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 text-[#1E3A8A]">Key Capabilities</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Explore our comprehensive suite of AI-powered disaster management tools
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Brain}
                            title="Real-time Prediction"
                            description="Disaster monitoring: Focused on wildfires, earthquakes, floods and weather."
                        />
                        <FeatureCard
                            icon={AlertTriangle}
                            title="Early Warning System"
                            description="Advanced ML models process real-time data for accurate early warnings"
                        />
                        <FeatureCard
                            icon={Map}
                            title="Cyclone Analysis"
                            description="Advanced mapping and terrain analysis for precise risk assessment"
                        />
                        <FeatureCard
                            icon={Command}
                            title="Flood Prediction"
                            description="Machine learning models predicting flood risks"
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Heatwave Prediction"
                            description="Health-impact focused heat alerts"
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Data Analytics"
                            description="Real-time visualization and predictive analytics"
                        />
                    </div>
                </div>
            </div>

            {/* Case Studies Section */}
            {/* <CaseStudies /> */}

            {/* Technology Section */}
            <div id="technology" className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-[#1E3A8A]">Advanced Technologies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000"
                                alt="Technology Dashboard"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Satellite className="w-6 h-6 text-[#E63946] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-xl mb-2 text-[#1E3A8A]">AI-Powered Predictive Analytics</h3>
                                    <p className="text-gray-600">Using machine learning models to analyze historical data and predict potential disasters.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Radar className="w-6 h-6 text-[#E63946] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-xl mb-2 text-[#1E3A8A]">Advanced Weather APIs</h3>
                                    <p className="text-gray-600">Accessing real-time and forecasted weather data for precise disaster preparedness.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Brain className="w-6 h-6 text-[#E63946] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-xl mb-2 text-[#1E3A8A]">Machine Learning</h3>
                                    <p className="text-gray-600">Cutting-edge algorithms for predictive analysis and risk assessment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            {/* <div id="about" className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-[#1E3A8A]">What Experts Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="This system has revolutionized how we respond to natural disasters. The predictive capabilities are unprecedented."
                            author="Dr. Sarah Chen"
                            role="Emergency Response Director"
                        />
                        <TestimonialCard
                            quote="The AI-powered predictions have helped us save countless lives by enabling proactive evacuations."
                            author="John Martinez"
                            role="Disaster Management Coordinator"
                        />
                        <TestimonialCard
                            quote="Integration with our existing systems was seamless. The real-time analytics have improved our response time significantly."
                            author="Emily Thompson"
                            role="Tech Operations Manager"
                        />
                    </div>
                </div>
            </div> */}

            {/* Call to Action Section */}
            {/* <div className="bg-[#1E3A8A] text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Join Our Emergency Response Network</h2>
                    <p className="text-xl text-[#FACC15] mb-8 max-w-2xl mx-auto">
                        Be part of a global network of emergency responders and disaster management professionals.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate('/create-account')}
                            className="bg-[#E63946] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            Create Account
                        </button>
                        <button
                            onClick={() => navigate('/response-coordination')}
                            className="border-2 border-[#FACC15] hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                        >
                            <Radio className="w-5 h-5" />
                            Emergency Access
                        </button>
                    </div>
                </div>
            </div> */}

            {/* Footer */}
            {/* <footer className="bg-blue-950 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <LifeBuoy className="w-6 h-6 text-[#FACC15]" />
                                <span className="font-bold text-xl">ResilienceAI</span>
                            </div>
                            <p className="text-[#FACC15]">
                                Building resilience with AI-powered disaster management.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>About Us</li>
                                <li>Features</li>
                                <li>API Reference</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>Documentation</li>
                                <li>Blog</li>
                                <li>Support</li>
                            </ul>
                        </div>
                        <div className="relative group">
                            <div className="cursor-pointer">
                                <p className="text-gray-300 mb-2">Project by:</p>
                                <p className="text-[#FACC15] font-medium">Anant & Ayush</p>
                            </div>
                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-white text-gray-800 p-4 rounded-lg shadow-lg w-64 z-10">
                                <div className="text-sm space-y-2">
                                    <div className="font-medium">Rishabh Gokhe</div>
                                    <div className="text-gray-600">Frontend Developer</div>
                                    <div className="border-t border-gray-200 my-2"></div>
                                    <div className="font-medium">Atul Thakre</div>
                                    <div className="text-gray-600">Frontend Developer</div>
                                </div>
                                <div className="absolute -bottom-1 left-4 w-3 h-3 bg-white transform rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-[#FACC15]/20 mt-12 pt-8 text-center text-gray-300">
                        <p>&copy; 2025 ResilienceAI. All rights reserved.</p>
                    </div>
                </div>
            </footer> */}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <>
            {/* <EmergencyNotifications /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/prediction" element={<Prediction />} />
                <Route path="/prediction/results" element={<PredictionResults />} />
                <Route path="/response-coordination" element={<ResponseCoordination />} />
                {/* <Route path="/create-account" element={<CreateAccount />} /> */}
                {/* <Route path="/population-safety" element={<PopulationSafety />} /> */}
                <Route path="/heatwave-prediction" element={<HeatwavePrediction />} />
                <Route path="/heatwave-result" element={<HeatwaveResult />} />
                {/* <Route path="/population-safety/:country/:city" element={<PopulationSafetyResults />} /> */}
                <Route path="/flood-prediction" element={<FloodPrediction />} />
                <Route path="/flood-result" element={<FloodResult />} />
                {/* <Route path="/population-safety/:country/:city" element={<PopulationSafetyResults />} /> */}
                <Route path="/learn-more/:featureId" element={<LearnMore />} />
                {/* <Route path="/geospatial-analysis" element={<GeospatialAnalysis />} />
                <Route path="/geospatial-analysis/:country/:city" element={<GeospatialResults />} />
                <Route path="/data-analytics" element={<DataAnalytics />} />
                <Route path="/data-analytics/results" element={<DataAnalyticsResults />} /> */}
                <Route
                    path="/response-coordination/dashboard"
                // element={
                //     <AuthGuard>
                //         <ResponseCoordination />
                //     </AuthGuard>
                // }
                />
            </Routes>
        </>
    );
}

export default App;

// function setIsMobile(arg0: boolean) {
//     throw new Error('Function not implemented.');
// }
