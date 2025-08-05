// import React, { useEffect, useState } from 'react';
// import { Bell, AlertTriangle, XCircle } from 'lucide-react';
// import { EmergencyNotificationSystem, EmergencyNotification } from '../lib/notifications/EmergencyNotificationSystem';

// export default function EmergencyNotifications() {
//   const [notifications, setNotifications] = useState<EmergencyNotification[]>([]);
//   const [showNotifications, setShowNotifications] = useState(true);

//   useEffect(() => {
//     const notificationSystem = EmergencyNotificationSystem.getInstance();
    
//     const unsubscribe = notificationSystem.subscribe((notification) => {
//       setNotifications(prev => [notification, ...prev].slice(0, 5)); // Keep last 5 notifications
      
//       // Show browser notification if supported
//       if ('Notification' in window && Notification.permission === 'granted') {
//         new Notification(notification.title, {
//           body: notification.message,
//           icon: '/notification-icon.png'
//         });
//       }
//     });

//     // Request notification permissions
//     if ('Notification' in window && Notification.permission === 'default') {
//       Notification.requestPermission();
//     }

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   if (!showNotifications || notifications.length === 0) return null;

//   return (
//     <div className="fixed top-0 right-0 left-0 z-50">
//       {notifications.map((notification) => (
//         <div
//           key={notification.id}
//           className={`${
//             notification.type === 'critical' 
//               ? 'bg-red-500' 
//               : 'bg-yellow-500'
//           } text-white px-4 py-3 shadow-lg`}
//         >
//           <div className="container mx-auto flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {notification.type === 'critical' ? (
//                 <AlertTriangle className="w-6 h-6 animate-pulse" />
//               ) : (
//                 <Bell className="w-6 h-6" />
//               )}
//               <div>
//                 <p className="font-semibold">{notification.title}</p>
//                 <p className="text-sm">{notification.message}</p>
//               </div>
//             </div>
//             <button 
//               onClick={() => setShowNotifications(false)}
//               className="text-white hover:text-red-100 transition-colors"
//             >
//               <XCircle className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }