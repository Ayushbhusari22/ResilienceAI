// import React, { useState, useEffect } from 'react';
// import { Shield, Brain, AlertTriangle, Activity, Map, Radio } from 'lucide-react';

// // AI-powered case study analysis engine
// class CaseStudyAI {
//   private static instance: CaseStudyAI;
//   private caseStudies: any[] = [];
//   private subscribers: ((studies: any[]) => void)[] = [];
//   private usedStudyIds: Set<string> = new Set();

//   private constructor() {
//     this.initializeCaseStudies();
//     this.startRealTimeUpdates();
//     this.startCaseStudyRotation();
//   }

//   public static getInstance(): CaseStudyAI {
//     if (!CaseStudyAI.instance) {
//       CaseStudyAI.instance = new CaseStudyAI();
//     }
//     return CaseStudyAI.instance;
//   }

//   private initializeCaseStudies() {
//     this.caseStudies = [
//       {
//         id: 'japan-tsunami-2023',
//         title: 'Japan Tsunami Early Warning',
//         description: 'How AI-powered predictions helped evacuate coastal areas 45 minutes before impact',
//         image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1000',
//         stats: [
//           { label: 'Lives Saved', value: '15,000+' },
//           { label: 'Response Time', value: '45min' }
//         ],
//         fullDetails: {
//           challenge: 'Rapid tsunami detection and evacuation coordination in densely populated coastal areas.',
//           solution: 'Implementation of AI-powered seismic analysis and automated early warning system.',
//           impact: 'Successful evacuation of 15,000+ residents before tsunami impact.',
//           keyMetrics: [
//             'Reduced warning time by 68%',
//             'Improved evacuation efficiency by 85%',
//             'Zero casualties in monitored areas'
//           ],
//           updates: []
//         },
//         category: 'Natural Disaster',
//         status: 'Active',
//         lastUpdate: new Date().toISOString()
//       },
//       {
//         id: 'california-wildfire-2024',
//         title: 'California Wildfire Prevention',
//         description: 'Predictive analytics helped prevent wildfire spread across 50,000 acres',
//         image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=1000',
//         stats: [
//           { label: 'Area Protected', value: '50k acres' },
//           { label: 'Cost Saved', value: '$100M' }
//         ],
//         fullDetails: {
//           challenge: 'Identifying high-risk areas and preventing wildfire spread in drought conditions.',
//           solution: 'Deployment of AI-driven risk assessment and automated resource allocation system.',
//           impact: 'Protected 50,000 acres of land and saved $100M in potential damages.',
//           keyMetrics: [
//             'Predicted 93% of high-risk zones',
//             'Reduced response time by 72%',
//             'Prevented 12 major fire outbreaks'
//           ],
//           updates: []
//         },
//         category: 'Environmental',
//         status: 'Active',
//         lastUpdate: new Date().toISOString()
//       },
//       {
//         id: 'india-flood-2024',
//         title: 'Mumbai Flood Management',
//         description: 'Smart city integration for real-time flood monitoring and response',
//         image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000',
//         stats: [
//           { label: 'Areas Monitored', value: '200+' },
//           { label: 'Alert Accuracy', value: '98%' }
//         ],
//         fullDetails: {
//           challenge: 'Managing urban flooding during monsoon season in densely populated areas.',
//           solution: 'Implementation of IoT sensor network and AI-powered prediction system.',
//           impact: 'Achieved 98% accuracy in flood predictions and reduced response time by 65%.',
//           keyMetrics: [
//             'Real-time monitoring of 200+ areas',
//             'Reduced flood damage by 75%',
//             'Improved emergency response by 65%'
//           ],
//           updates: []
//         },
//         category: 'Infrastructure',
//         status: 'Active',
//         lastUpdate: new Date().toISOString()
//       },
//       {
//         id: 'mexico-earthquake-2024',
//         title: 'Mexico City Earthquake Response',
//         description: 'AI-driven seismic monitoring and rapid response coordination',
//         image: 'https://images.unsplash.com/photo-1584314590651-c393f0a08b2a?auto=format&fit=crop&w=1000',
//         stats: [
//           { label: 'Early Warning', value: '30sec' },
//           { label: 'Buildings Monitored', value: '5,000+' }
//         ],
//         fullDetails: {
//           challenge: 'Providing early earthquake warnings in a seismically active urban area.',
//           solution: 'Advanced seismic monitoring network with machine learning prediction.',
//           impact: 'Provided crucial early warning time for millions of residents.',
//           keyMetrics: [
//             'Increased warning time by 40%',
//             'Reduced infrastructure damage by 55%',
//             'Improved evacuation success rate by 80%'
//           ],
//           updates: []
//         },
//         category: 'Natural Disaster',
//         status: 'Active',
//         lastUpdate: new Date().toISOString()
//       },
//       {
//         id: 'australia-cyclone-2024',
//         title: 'Australian Cyclone Tracking',
//         description: 'Advanced cyclone prediction and community protection system',
//         image: 'https://images.unsplash.com/photo-1527482937786-6608f6e14c15?auto=format&fit=crop&w=1000',
//         stats: [
//           { label: 'Prediction Accuracy', value: '95%' },
//           { label: 'Communities Protected', value: '150+' }
//         ],
//         fullDetails: {
//           challenge: 'Accurate prediction of cyclone paths and intensity in coastal regions.',
//           solution: 'Integration of satellite data with AI weather modeling.',
//           impact: 'Protected coastal communities with precise early warnings.',
//           keyMetrics: [
//             'Improved path prediction by 35%',
//             'Reduced evacuation time by 50%',
//             'Saved $200M in potential damages'
//           ],
//           updates: []
//         },
//         category: 'Natural Disaster',
//         status: 'Active',
//         lastUpdate: new Date().toISOString()
//       },
//       {
//         id: 'amazon-deforestation-2024',
//         title: 'Amazon Deforestation Prevention',
//         description: 'Satellite-based monitoring system for forest protection',
//         image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000',
//         stats: [
//           { label: 'Area Protected', value: '100k acres' },
//           { label: 'Detection Rate', value: '99%' }
//         ],
//         fullDetails: {
//           challenge: 'Real-time detection of illegal deforestation activities.',
//           solution: 'AI-powered satellite imagery analysis and rapid response system.',
//           impact: 'Significant reduction in illegal deforestation activities.',
//           keyMetrics: [
//             'Protected 100,000+ acres of rainforest',
//             'Reduced response time to incidents by 85%',
//             'Increased prosecution rate by 70%'
//           ],
//           updates: []
//         },
//         category: 'Environmental',
//         status: 'Active',
//         lastUpdate: new Date().toISOString()
//       }
//     ];
//   }

//   private startRealTimeUpdates() {
//     // Simulate real-time updates
//     setInterval(() => {
//       const randomStudies = this.getRandomStudies(2); // Update multiple studies simultaneously
//       const updates = [
//         'New affected area identified',
//         'Response team deployed',
//         'Resource allocation optimized',
//         'Early warning system activated',
//         'Emergency protocols initiated',
//         'Recovery phase started',
//         'Satellite data analysis completed',
//         'AI prediction model updated',
//         'Community alert system tested',
//         'Infrastructure assessment completed',
//         'Environmental impact evaluated',
//         'Relief resources mobilized'
//       ];

//       randomStudies.forEach(study => {
//         const newUpdate = {
//           timestamp: new Date().toISOString(),
//           message: updates[Math.floor(Math.random() * updates.length)],
//           type: Math.random() > 0.5 ? 'info' : 'alert'
//         };

//         study.fullDetails.updates = [
//           newUpdate,
//           ...(study.fullDetails.updates || []).slice(0, 4)
//         ];
//         study.lastUpdate = new Date().toISOString();

//         // Update stats randomly
//         study.stats = study.stats.map(stat => ({
//           ...stat,
//           value: this.updateStatValue(stat.value)
//         }));
//       });

//       this.notifySubscribers();
//     }, 5000);
//   }

//   private startCaseStudyRotation() {
//     // Rotate case studies every 2 minutes
//     setInterval(() => {
//       const newStudy = this.generateNewCaseStudy();
      
//       // Remove oldest study and add new one
//       this.caseStudies = [
//         ...this.caseStudies.slice(1),
//         newStudy
//       ];

//       // Keep track of active studies
//       const oldestStudyId = this.caseStudies[0].id;
//       if (this.usedStudyIds.has(oldestStudyId)) {
//         this.usedStudyIds.delete(oldestStudyId);
//       }

//       this.notifySubscribers();
//     }, 120000);
//   }

//   private getRandomStudies(count: number) {
//     const shuffled = [...this.caseStudies].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   }

//   private generateNewCaseStudy() {
//     const locations = [
//       { city: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000' },
//       { city: 'Rio de Janeiro', country: 'Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000' },
//       { city: 'Cape Town', country: 'South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000' },
//       { city: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000' },
//       { city: 'Vancouver', country: 'Canada', image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1000' },
//       { city: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000' },
//       { city: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000' },
//       { city: 'Mumbai', country: 'India', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1000' },
//       { city: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000' },
//       { city: 'Mexico City', country: 'Mexico', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1000' }
//     ];

//     const scenarios = [
//       {
//         type: 'Natural Disaster',
//         title: 'Earthquake Response',
//         description: 'AI-powered seismic monitoring and response system'
//       },
//       {
//         type: 'Environmental',
//         title: 'Climate Adaptation',
//         description: 'Smart city climate resilience program'
//       },
//       {
//         type: 'Infrastructure',
//         title: 'Urban Flooding',
//         description: 'Integrated flood management system'
//       },
//       {
//         type: 'Natural Disaster',
//         title: 'Cyclone Tracking',
//         description: 'Advanced storm prediction and response'
//       },
//       {
//         type: 'Environmental',
//         title: 'Air Quality Control',
//         description: 'Real-time pollution monitoring and mitigation'
//       },
//       {
//         type: 'Infrastructure',
//         title: 'Critical Infrastructure',
//         description: 'Smart infrastructure resilience system'
//       }
//     ];

//     // Filter out already used locations
//     const availableLocations = locations.filter(loc => 
//       !Array.from(this.usedStudyIds).some(id => id.includes(loc.city.toLowerCase()))
//     );

//     // If all locations have been used, clear the set and start over
//     if (availableLocations.length === 0) {
//       this.usedStudyIds.clear();
//       return this.generateNewCaseStudy();
//     }

//     const location = availableLocations[Math.floor(Math.random() * availableLocations.length)];
//     const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
//     const studyId = `${location.city.toLowerCase()}-${Date.now()}`;

//     // Add to used IDs
//     this.usedStudyIds.add(studyId);

//     return {
//       id: studyId,
//       title: `${location.city} ${scenario.title}`,
//       description: scenario.description,
//       image: location.image,
//       stats: [
//         { label: 'Response Rate', value: '95%' },
//         { label: 'Coverage', value: '500k+' }
//       ],
//       fullDetails: {
//         challenge: `Implementing comprehensive ${scenario.title.toLowerCase()} solutions in ${location.city}.`,
//         solution: 'Advanced AI and IoT integration for real-time monitoring and response.',
//         impact: 'Significant improvement in disaster preparedness and response capabilities.',
//         keyMetrics: [
//           'Improved response time by 75%',
//           'Reduced impact severity by 60%',
//           'Enhanced community resilience'
//         ],
//         updates: []
//       },
//       category: scenario.type,
//       status: 'Active',
//       lastUpdate: new Date().toISOString()
//     };
//   }

//   private updateStatValue(value: string): string {
//     if (value.includes('+')) {
//       const num = parseInt(value.replace(/[^0-9]/g, ''));
//       return `${num + Math.floor(Math.random() * 100)}+`;
//     }
//     if (value.includes('k')) {
//       const num = parseInt(value.replace(/[^0-9]/g, ''));
//       return `${num + Math.floor(Math.random() * 5)}k`;
//     }
//     if (value.includes('M')) {
//       const num = parseInt(value.replace(/[^0-9]/g, ''));
//       return `$${num + Math.floor(Math.random() * 10)}M`;
//     }
//     if (value.includes('min')) {
//       const num = parseInt(value.replace(/[^0-9]/g, ''));
//       return `${Math.max(30, num + (Math.random() > 0.5 ? 1 : -1))}min`;
//     }
//     return value;
//   }

//   public subscribe(callback: (studies: any[]) => void) {
//     this.subscribers.push(callback);
//     callback(this.caseStudies);
//     return () => {
//       this.subscribers = this.subscribers.filter(cb => cb !== callback);
//     };
//   }

//   private notifySubscribers() {
//     this.subscribers.forEach(callback => callback([...this.caseStudies]));
//   }

//   public getCaseStudies() {
//     return [...this.caseStudies];
//   }

//   public filterStudies(category?: string) {
//     if (!category) return this.getCaseStudies();
//     return this.caseStudies.filter(study => study.category === category);
//   }
// }

// export default function CaseStudies() {
//   const [studies, setStudies] = useState<any[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedStudy, setSelectedStudy] = useState<any>(null);

//   useEffect(() => {
//     const ai = CaseStudyAI.getInstance();
//     const unsubscribe = ai.subscribe(setStudies);
//     return unsubscribe;
//   }, []);

//   const categories = ['All', 'Natural Disaster', 'Environmental', 'Infrastructure'];

//   return (
//     <div className="bg-gray-50 py-20">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-4 text-[#1E3A8A]">Success Stories</h2>
//         <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
//           Real-world examples of how our AI-powered platform has transformed disaster management
//         </p>

//         {/* Category Filter */}
//         <div className="flex justify-center gap-4 mb-12">
//           {categories.map(category => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
//               className={`px-4 py-2 rounded-lg transition-all ${
//                 (category === 'All' && !selectedCategory) || category === selectedCategory
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-gray-600 hover:bg-blue-50'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Case Studies Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {studies
//             .filter(study => !selectedCategory || study.category === selectedCategory)
//             .map(study => (
//               <div 
//                 key={study.id}
//                 onClick={() => setSelectedStudy(study)}
//                 className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer"
//               >
//                 <div className="h-48 relative">
//                   <img
//                     src={study.image}
//                     alt={study.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                   <div className="absolute top-4 right-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       study.status === 'Active' 
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {study.status}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">{study.title}</h3>
//                   <p className="text-gray-600 mb-4">{study.description}</p>
//                   <div className="grid grid-cols-2 gap-4">
//                     {study.stats.map((stat: any, index: number) => (
//                       <div key={index} className="text-center p-2 bg-blue-50 rounded-lg">
//                         <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
//                         <p className="text-sm text-blue-800">{stat.label}</p>
//                       </div>
//                     ))}
//                   </div>
//                   {study.fullDetails.updates.length > 0 && (
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
//                         <span>Latest Update</span>
//                         <span>{new Date(study.lastUpdate).toLocaleTimeString()}</span>
//                       </div>
//                       <div className={`p-2 rounded-lg text-sm ${
//                         study.fullDetails.updates[0].type === 'alert'
//                           ? 'bg-red-50 text-red-700'
//                           : 'bg-blue-50 text-blue-700'
//                       }`}>
//                         {study.fullDetails.updates[0].message}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Case Study Modal */}
//         {selectedStudy && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="relative h-64">
//                 <img
//                   src={selectedStudy.image}
//                   alt={selectedStudy.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
//                   <div className="p-6">
//                     <h2 className="text-2xl font-bold text-white mb-2">{selectedStudy.title}</h2>
//                     <p className="text-yellow-400">{selectedStudy.description}</p>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => setSelectedStudy(null)}
//                   className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="p-6 space-y-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">Challenge</h3>
//                   <p className="text-gray-600">{selectedStudy.fullDetails.challenge}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">Solution</h3>
//                   <p className="text-gray-600">{selectedStudy.fullDetails.solution}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">Impact</h3>
//                   <p className="text-gray-600">{selectedStudy.fullDetails.impact}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Metrics</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {selectedStudy.fullDetails.keyMetrics.map((metric: string, index: number) => (
//                       <div key={index} className="p-3 bg-blue-50 rounded-lg text-center">
//                         <p className="text-blue-800">{metric}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 {selectedStudy.fullDetails.updates.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Updates</h3>
//                     <div className="space-y-3">
//                       {selectedStudy.fullDetails.updates.map((update: any, index: number) => (
//                         <div
//                           key={index}
//                           className={`p-3 rounded-lg flex items-start gap-3 ${
//                             update.type === 'alert'
//                               ? 'bg-red-50 text-red-700'
//                               : 'bg-blue-50 text-blue-700'
//                           }`}
//                         >
//                           {update.type === 'alert' ? (
//                             <AlertTriangle className="w-5 h-5 flex-shrink-0" />
//                           ) : (
//                             <Activity className="w-5 h-5 flex-shrink-0" />
//                           )}
//                           <div>
//                             <p className="font-medium">{update.message}</p>
//                             <p className="text-sm opacity-75">
//                               {new Date(update.timestamp).toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }