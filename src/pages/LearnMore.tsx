// import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Radio, Shield as Brain, AlertTriangle,
  Satellite, Radar,
  // Eye
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
        icon: Brain
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
    icon: Brain,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature Not Found</h2>
          <p className="text-gray-600 mb-4">The requested feature information is not available.</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{feature.title}</h1>
              <p className="text-yellow-400">{feature.description}</p>
            </div>
            <Icon className="w-12 h-12 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative h-96 rounded-xl overflow-hidden mb-12">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
            <div className="max-w-2xl px-8">
              <h2 className="text-3xl font-bold text-white mb-4">{feature.title}</h2>
              <p className="text-lg text-white/90">{feature.description}</p>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feature.benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-800">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-5">
            {feature.details.map((detail, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                {detail.icon && (
                  <div className="mb-4">
                    <detail.icon className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{detail.title}</h3>
                <p className="text-gray-600">{detail.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Block 1 - Original with icon */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl ml-2 font-semibold text-gray-800">Data Collection</h3>
                </div>
                <p className="text-gray-600">Gathers weather data from multiple reliable sources for accurate predictions.</p>
              </div>

              {/* Block 2 - Original with icon */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h3 className="text-xl ml-2 font-semibold text-gray-800">Analysis</h3>
                </div>
                <p className="text-gray-600">Processes and analyzes the collected data using advanced algorithms.</p>
              </div>

              {/* Block 3 - Original with icon */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-xl ml-2 font-semibold text-gray-800">Visualization</h3>
                </div>
                <p className="text-gray-600">Presents the results in easy-to-understand charts and alerts.</p>
              </div>

              {/* Block 4 - Heatwave Model */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <h3 className="text-xl ml-2 font-semibold text-gray-800">Heatwave Prediction</h3>
                </div>
                <p className="text-gray-600">
                  Analyzes temperature, humidity, and wind patterns to detect heatwave conditions.
        Uses ensemble machine learning to predict heatwave probabilities with alert levels.                </p>
              </div>

              {/* Block 5 - Flood Model */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <h3 className="text-xl ml-2 font-semibold text-gray-800">Flood Prediction</h3>
                </div>
                <p className="text-gray-600">
                  Processes rainfall, resevior levels, and soil moisture data to assess flood risks.
        Evaluates multiple ML models to select the most accurate predictor.                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        {feature.technologies && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-4">
              {feature.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {/* <div className="bg-blue-900 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-6">
            Join our network of emergency responders and disaster management professionals.
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
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold backdrop-blur-lg transition-colors flex items-center gap-2 border border-white/30"
            >
              <Radio className="w-5 h-5" />
              Emergency Access
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default LearnMore;