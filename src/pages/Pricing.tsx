// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Shield, CheckCircle, ArrowLeft } from 'lucide-react';
// import { useSubscription } from '../hooks/useSubscription';

// export default function Pricing() {
//   const navigate = useNavigate();
//   const { subscription } = useSubscription();

//   const plans = [
//     {
//       name: 'Basic',
//       price: '$99',
//       description: 'Essential features for small teams',
//       features: [
//         'Real-time Prediction',
//         'Basic Analytics',
//         'Email Support'
//       ]
//     },
//     {
//       name: 'Professional',
//       price: '$299',
//       description: 'Advanced features for growing organizations',
//       features: [
//         'All Basic Features',
//         'Response Coordination',
//         'Population Safety',
//         'Advanced Analytics',
//         'Early Warning System',
//         'Team Collaboration',
//         '24/7 Priority Support'
//       ]
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Custom solutions for large organizations',
//       features: [
//         'All Professional Features',
//         'Custom Integration',
//         'Dedicated Support Team',
//         'SLA Guarantee'
//       ]
//     }
//   ];

//   const handleUpgrade = (plan: string) => {
//     // In a real app, this would redirect to a payment processor
//     console.log(`Upgrading to ${plan}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-900 via-[#1E3A8A] to-blue-900">
//       <div className="container mx-auto px-4 py-8">
//         <button 
//           onClick={() => navigate('/')}
//           className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors mb-8"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Home
//         </button>

//         <div className="max-w-5xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="flex justify-center mb-4">
//               <div className="relative">
//                 <Shield className="w-12 h-12 text-[#FACC15]" />
//               </div>
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h1>
//             <p className="text-yellow-400">Unlock premium features to enhance your disaster management capabilities</p>
//           </div>

//           {/* Plans */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {plans.map((plan, index) => {
//               const isCurrentPlan = subscription?.plan.toLowerCase() === plan.name.toLowerCase();
              
//               return (
//                 <div 
//                   key={plan.name}
//                   className={`${
//                     index === 1 
//                       ? 'bg-blue-900 text-white transform scale-105 shadow-xl border-blue-700' 
//                       : 'bg-white text-gray-800'
//                   } rounded-xl p-8 border relative`}
//                 >
//                   {index === 1 && (
//                     <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                       <span className="bg-[#FACC15] text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
//                         Most Popular
//                       </span>
//                     </div>
//                   )}

//                   <h3 className={`text-xl font-semibold mb-2 ${
//                     index === 1 ? 'text-white' : 'text-gray-800'
//                   }`}>{plan.name}</h3>
                  
//                   <p className={`mb-4 ${
//                     index === 1 ? 'text-blue-200' : 'text-gray-600'
//                   }`}>{plan.description}</p>
                  
//                   <div className="mb-6">
//                     <span className={`text-4xl font-bold ${
//                       index === 1 ? 'text-white' : 'text-[#1E3A8A]'
//                     }`}>{plan.price}</span>
//                     {plan.price !== 'Custom' && (
//                       <span className={
//                         index === 1 ? 'text-blue-200' : 'text-gray-600'
//                       }>/month</span>
//                     )}
//                   </div>

//                   <ul className="space-y-3 mb-8">
//                     {plan.features.map((feature, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <CheckCircle className={`w-5 h-5 ${
//                           index === 1 ? 'text-[#FACC15]' : 'text-green-500'
//                         }`} />
//                         <span className={
//                           index === 1 ? 'text-blue-100' : 'text-gray-600'
//                         }>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <button
//                     onClick={() => handleUpgrade(plan.name)}
//                     disabled={isCurrentPlan}
//                     className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
//                       isCurrentPlan
//                         ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                         : index === 1
//                           ? 'bg-[#FACC15] text-blue-900 hover:bg-yellow-400'
//                           : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                     }`}
//                   >
//                     {isCurrentPlan ? 'Current Plan' : plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade'}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }