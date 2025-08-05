import { useState } from 'react';
import { LifeBuoy} from 'lucide-react';

function Footer() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <footer className="bg-blue-950 text-white py-12 relative">
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
                    <div>
                        <div
                            className="cursor-pointer"
                            onClick={() => setShowPopup(true)}
                        >
                            <p className="text-gray-300 mb-2">Project by:</p>
                            <p className="text-[#FACC15] font-medium">Anant , Ayush & Srujan</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[#FACC15]/20 mt-12 pt-8 text-center text-white">
                    <p>&copy; 2025 Resilience AI. All rights reserved.</p>
                </div>
            </div>

            {/* Centered Popup */}
            {showPopup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
                        >
                            <X className="w-5 h-5" />
                        </button> */}

                        <h3 className="text-xl font-bold mb-4 text-center">Development Team</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium">Anant Gobade</p>
                                    <p className="text-sm text-gray-600">Backend Developer</p>
                                </div>
                                <a
                                    href="https://github.com/anantgobade03"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center "
                                >
                                    {/* <Github className="w-5 h-5 mr-1" /> */}
                                    GitHub
                                </a>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium">Ayush Bhusari</p>
                                    <p className="text-sm text-gray-600">Frontend Developer</p>
                                </div>
                                <a
                                    href="https://github.com/Ayushbhusari22"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    {/* <Github className="w-5 h-5 mr-1" /> */}
                                    GitHub
                                </a>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium">Srujan Deshmukh</p>
                                    <p className="text-sm text-gray-600">Android Developer</p>
                                </div>
                                <a
                                    href="https://github.com/SrujanDeshmukh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    {/* <Github className="w-5 h-5 mr-1" /> */}
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;