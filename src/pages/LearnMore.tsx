import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Radio, Lightbulb, AlertTriangle,
  Satellite, Radar, CheckCircle,
  Zap as ZapAlert, Activity, ArrowRight, Sparkles
} from 'lucide-react';

interface FeatureSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  benefits: string[];
  details: {
    title: string;
    description: string;
    icon?: any;
  }[];
  image: string;
  technologies?: string[];
}

const features: { [key: string]: FeatureSection } = {
  'early-warning': {
    id: 'early-warning',
    title: 'Early Warning System',
    description: 'Advanced ML models process real-time data from multiple sources to provide accurate early warnings, enabling proactive disaster response.',
    icon: AlertTriangle,
    benefits: [
      'Real-time multi-source data processing',
      'AI-powered risk assessment',
      'Automated alert generation',
      'Historical pattern analysis'
    ],
    details: [
      {
        title: 'Multi-Source Data Integration',
        description: 'Our system integrates data from satellites, ground sensors, weather stations, and social media to provide comprehensive monitoring.',
        icon: Satellite
      },
      {
        title: 'Machine Learning Analysis',
        description: 'Advanced AI algorithms analyze patterns and predict potential disasters with high accuracy.',
        icon: Lightbulb
      },
      {
        title: 'Real-time Monitoring',
        description: 'Continuous monitoring of environmental conditions, seismic activity, and weather patterns.',
        icon: Radar
      }
    ],
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1600',
    technologies: [
      'Machine Learning',
      'Neural Networks',
      'Big Data Analytics',
      'IoT Sensors',
      'Satellite Imaging',
      'Cloud Computing'
    ]
  },
  'prediction': {
    id: 'prediction',
    title: 'Real-time Prediction',
    description: 'Advanced AI algorithms predict disasters with unprecedented accuracy, enabling proactive response and mitigation strategies.',
    icon: Lightbulb,
    benefits: [
      'Early warning system for multiple disaster types',
      'Machine learning-powered risk assessment',
      'Real-time monitoring and analysis',
      'Automated alert generation'
    ],
    details: [
      {
        title: 'AI-Powered Analysis',
        description: 'Our advanced machine learning models process vast amounts of data from multiple sources to provide accurate predictions and risk assessments.'
      },
      {
        title: 'Real-time Monitoring',
        description: 'Continuous monitoring of environmental conditions, seismic activity, and other critical parameters to detect potential threats.'
      },
      {
        title: 'Early Warning System',
        description: 'Automated alert system that notifies relevant authorities and affected populations about impending disasters.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600'
  },
  'response-coordination': {
    id: 'response-coordination',
    title: 'Response Coordination',
    description: 'Streamlined emergency response coordination and resource allocation system for efficient disaster management.',
    icon: Radio,
    benefits: [
      'Centralized command and control',
      'Real-time resource tracking',
      'Automated dispatch system',
      'Inter-agency coordination'
    ],
    details: [
      {
        title: 'Resource Management',
        description: 'Efficient allocation and tracking of emergency resources, personnel, and equipment during disaster response.'
      },
      {
        title: 'Communication Hub',
        description: 'Centralized platform for coordination between different emergency response teams and agencies.'
      },
      {
        title: 'Action Tracking',
        description: 'Real-time monitoring of response activities and resource deployment status.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1600'
  }
};

function LearnMore() {
  const { featureId } = useParams();
  const navigate = useNavigate();
  const feature = featureId ? features[featureId] : null;

  if (!feature) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Feature Not Found</h2>
          <p className="text-slate-400 mb-8">The requested feature information is not available.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 py-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-purple-400" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {feature.title}
                </h1>
              </div>
              <p className="text-lg text-slate-400 max-w-2xl">{feature.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Image Section */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-20 shadow-2xl group">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent flex items-center">
            <div className="max-w-2xl px-8">
              <h2 className="text-4xl font-bold text-white mb-4">{feature.title}</h2>
              <p className="text-lg text-slate-200 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Key Benefits</h2>
            <p className="text-slate-400">Discover the powerful advantages of our system</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feature.benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative rounded-xl p-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all"></div>
                <div className="relative z-10 flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-white font-medium text-sm leading-relaxed">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Understanding the technology behind our solution</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {feature.details.map((detail, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-cyan-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-purple-600/0 group-hover:from-cyan-600/10 group-hover:to-purple-600/10 transition-all"></div>
                <div className="relative z-10">
                  {detail.icon && (
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all">
                        <detail.icon className="w-6 h-6 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3">{detail.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{detail.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Process Workflow */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Process Workflow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Data Collection',
                  desc: 'Gathers data from multiple reliable sources including weather stations, satellites, and IoT sensors.',
                  icon: Satellite,
                  gradient: 'from-blue-500/20 to-cyan-500/20'
                },
                {
                  title: 'Analysis & Processing',
                  desc: 'Advanced ML algorithms analyze patterns and identify potential risks with high accuracy.',
                  icon: Lightbulb,
                  gradient: 'from-green-500/20 to-emerald-500/20'
                },
                {
                  title: 'Alert & Visualization',
                  desc: 'Generates real-time alerts and presents insights through intuitive dashboards for quick decision-making.',
                  icon: ZapAlert,
                  gradient: 'from-yellow-500/20 to-orange-500/20'
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all"></div>
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disaster-Specific Models */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Specialized Disaster Models</h2>
            <p className="text-slate-400">Tailored algorithms for different disaster types</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Heatwave Prediction',
                desc: 'Analyzes temperature, humidity, and wind patterns to detect heatwave conditions. Uses ensemble ML to predict probabilities with alert levels.',
                icon: Activity,
                gradient: 'from-red-500/10 to-orange-500/10',
                border: 'border-red-500/30'
              },
              {
                title: 'Flood Prediction',
                desc: 'Processes rainfall, reservoir levels, and soil moisture data. Evaluates multiple ML models to select the most accurate predictor.',
                icon: Radar,
                gradient: 'from-cyan-500/10 to-blue-500/10',
                border: 'border-cyan-500/30'
              }
            ].map((model, idx) => (
              <div
                key={idx}
                className={`group relative rounded-2xl p-8 bg-gradient-to-br ${model.gradient} backdrop-blur-xl border ${model.border} hover:border-purple-500/50 transition-all overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all"></div>
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-xl flex items-center justify-center flex-shrink-0 border border-slate-700">
                    <model.icon className="w-6 h-6 text-purple-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{model.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{model.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        {feature.technologies && (
          <div className="mb-20">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Technologies Used</h2>
              <p className="text-slate-400">Cutting-edge tools powering our system</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {feature.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="group relative px-6 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all backdrop-blur-sm cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all"></div>
                  <span className="relative z-10 text-purple-300 group-hover:text-purple-200 font-semibold text-sm flex items-center gap-2 transition-colors">
                    <Sparkles className="w-4 h-4" />
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="relative rounded-2xl overflow-hidden p-12 border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-slate-900/0"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Save Lives?</h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our network of emergency responders and disaster management professionals. Together, we can save lives through better prediction and coordination.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate('/create-account')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group"
              >
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/response-coordination')}
                className="px-8 py-4 rounded-xl border-2 border-cyan-500/50 text-cyan-300 font-semibold hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 group"
              >
                Emergency Access
                <Radio className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;