import { useState, useEffect } from 'react';
import { Zap, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

function Navbar() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // useEffect(() => {
    //     // Lock scroll when mobile menu is open
    //     // Lock/unlock scroll when mobile menu is toggled
    //     if (showMobileMenu) {
    //         document.body.style.overflow = 'hidden';
    //         document.body.style.position = 'fixed';
    //         document.body.style.width = '100%';
    //     } else {
    //         document.body.style.overflow = 'visible';
    //         document.body.style.position = 'static';
    //     }
    // }, [showMobileMenu]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50' : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Resilience<span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">AI</span></h1>
                            <p className="text-xs text-slate-400 tracking-widest">EMERGENCY NETWORK</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        {['Features', 'Technology', 'About'].map((item) => (
                            <Link
                                key={item}
                                to={item.toLowerCase()}      
                                smooth={true}
                                duration={500}
                                offset={-80}                
                                onClick={() => setActiveSection(item)}
                                className={`px-4 py-2 rounded-lg transition-all text-sm font-medium cursor-pointer ${activeSection === item
                                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}
                        
                        <button
                            className="ml-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                            onClick={() => navigate('/response-coordination')}>
                            <Radio className="w-4 h-4" />
                            Emergency Access
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;