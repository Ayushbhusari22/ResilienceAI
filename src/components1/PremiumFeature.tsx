// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Lock } from 'lucide-react';
// import { useSubscription } from '../hooks/useSubscription';

// interface PremiumFeatureProps {
//   feature: string;
//   minimumPlan: 'basic' | 'professional' | 'enterprise';
//   children: React.ReactNode;
// }

// export default function PremiumFeature({ feature, minimumPlan, children }: PremiumFeatureProps) {
//   const navigate = useNavigate();
//   const { subscription, loading } = useSubscription();

//   if (loading) return null;

//   const hasAccess = subscription?.features.includes(feature);

//   if (!hasAccess) {
//     return (
//       <div className="relative">
//         <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
//           <div className="text-center">
//             <Lock className="w-8 h-8 text-white mx-auto mb-2" />
//             <p className="text-white font-medium mb-2">Premium Feature</p>
//             <button
//               onClick={() => navigate('/pricing')}
//               className="bg-[#FACC15] text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
//             >
//               Upgrade to {minimumPlan}
//             </button>
//           </div>
//         </div>
//         {children}
//       </div>
//     );
//   }

//   return <>{children}</>;
// }