import TestimonialCard from "./TestimonialCard";

export default function TechnologySection() {
    return (
        <div id="about" className="bg-slate-950">
        <div className="py-20 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-white mb-16 text-center">Trusted by Experts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="This system revolutionized our disaster response. The predictive capabilities are game-changing."
                        author="Dr. Sarah Chen"
                        role="Emergency Response Director"
                    />
                    <TestimonialCard
                        quote="AI-powered predictions enabled us to save countless lives through proactive measures."
                        author="John Martinez"
                        role="Disaster Management Coordinator"
                    />
                    <TestimonialCard
                        quote="Seamless integration with exceptional real-time analytics. Highly recommended."
                        author="Emily Thompson"
                        role="Tech Operations Manager"
                    />
                </div>
            </div>
        </div>
        </div>
    );
}