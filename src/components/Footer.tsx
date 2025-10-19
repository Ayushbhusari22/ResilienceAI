import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-slate-950">
      <footer className="border-t border-slate-800 py-12 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold mb-4">DisasterAI</h3>
              <p className="text-slate-400 text-sm">
                Empowering communities with AI-driven disaster management
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Features</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">API Reference</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Support</li>
              </ul>
            </div>

            {/* Connect / Project By */}
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div
                className="cursor-pointer text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                onClick={() => setShowPopup(true)}
              >
                <p className="mb-2">Project by:</p>
                <p className="text-[#FACC15] font-medium">Anant, Ayush & Srujan</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 DisasterAI. All rights reserved.</p>
          </div>
        </div>

        {/* Centered Popup */}
        {showPopup && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowPopup(false)}
          >
            <div
              className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative border border-slate-700/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative z-10">

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Development Team
                  </h3>
                  <p className="text-slate-400 text-sm">Meet the creators behind ResilienceAI</p>
                </div>


                <div className="space-y-4">
                  {/* Anant Gobade */}
                  <div className="group relative rounded-xl p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Anant Gobade</p>
                        <p className="text-xs text-cyan-400 mt-1">Backend Developer</p>
                      </div>
                      <a
                        href="https://github.com/anantgobade03"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 font-medium text-sm transition-all flex items-center gap-2"
                      >
                        GitHub
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Ayush Bhusari */}
                  <div className="group relative rounded-xl p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Ayush Bhusari</p>
                        <p className="text-xs text-cyan-400 mt-1">Frontend Developer</p>
                      </div>
                      <a
                        href="https://github.com/Ayushbhusari22"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 font-medium text-sm transition-all flex items-center gap-2"
                      >
                        GitHub
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Srujan Deshmukh */}
                  <div className="group relative rounded-xl p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">Srujan Deshmukh</p>
                        <p className="text-xs text-cyan-400 mt-1">Android Developer</p>
                      </div>
                      <a
                        href="https://github.com/SrujanDeshmukh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 font-medium text-sm transition-all flex items-center gap-2"
                      >
                        GitHub
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <p className="text-center text-xs text-slate-400">
                    Building the future of disaster management together
                  </p>
                </div>

                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-1 right-1 w-7 h-7 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-white transition-all flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}