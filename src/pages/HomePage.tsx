import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import StatsSection from '../components/StatsSection';
import TechnologySection from '../components/TechnologySection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

// function StatCard({ value, label }) {
//   return (
//     <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 group hover:border-cyan-500/50 transition-all">
//       <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/5 group-hover:to-cyan-500/0 transition-all"></div>
//       <div className="relative z-10">
//         <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">{label}</p>
//         <h3 className="text-4xl font-bold text-white">{value}</h3>
//       </div>
//     </div>
//   );
// }

// function FeatureCard({ icon: Icon, title, description }) {
//   return (
//     <button className="group relative rounded-2xl p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 text-left overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300"></div>

//       <div className="relative z-10">
//         <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
//           <Icon className="w-7 h-7 text-purple-400 group-hover:text-pink-400 transition-colors" />
//         </div>
//         <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
//         <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
//         <div className="flex items-center text-purple-400 text-sm font-medium group-hover:text-pink-400 transition-colors">
//           Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//         </div>
//       </div>
//     </button>
//   );
// }

export default function HomePage() {
  // const [isScrolled, setIsScrolled] = useState(false);
  // const [activeNav, setActiveNav] = useState('');

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <>
      {/* Navigation */}
      
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Technology Section */}
      <TechnologySection />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </>
  );
};