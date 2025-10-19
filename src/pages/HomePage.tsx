import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import StatsSection from '../components/StatsSection';
import TechnologySection from '../components/TechnologySection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function HomePage() {

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