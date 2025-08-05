// import React from 'react';
import {
  AlertCircle, Phone, MapPin, Shield, Thermometer,
  Waves, Flame,  Wind
} from 'lucide-react';
import './response.css';

export default function NaturalDisasterResponse() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              {/* <AlertCircle className="w-8 h-8 text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> */}
              <Shield className="w-16 h-16 text-blue-800" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Indian Disaster Management System</h1>
          <p className="text-xl text-yellow-600">Prediction • Preparation • Response</p>
        </div>

        {/* National Emergency Contacts */}
        <div className=" bx bg-red-100 rounded-xl p-6 mb-8 border border-red-300 shadow-md">
          <h2 className=" text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Phone className="w-6 h-6 text-red-600" />
            National Emergency Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">National Emergency Number</h3>
              <p className="text-2xl font-bold text-red-600">112</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">National Disaster Response Force</h3>
              <p className="text-xl font-bold text-red-600">011-24363260</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Ambulance</h3>
              <p className="text-2xl font-bold text-red-600">108</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Fire Emergency</h3>
              <p className="text-2xl font-bold text-red-600">101</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Police</h3>
              <p className="text-2xl font-bold text-red-600">100</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Women Helpline</h3>
              <p className="text-2xl font-bold text-red-600">1091</p>
            </div>
          </div>
        </div>

        {/* Disaster Categories */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Floods */}
          <div className="bx bg-blue-50 rounded-xl p-6 border border-blue-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Waves className="w-6 h-6 text-blue-600" />
              Floods
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Alert Signs</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Continuous heavy rainfall for more than 24 hours</li>
                  <li>Rising water levels in nearby rivers and dams</li>
                  <li>IMD warnings for specific regions</li>
                  <li>Unusual backing up of drains or sewers</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Safety Measures</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Move to higher ground immediately</li>
                  <li>Avoid walking or driving through flood waters</li>
                  <li>Disconnect electrical appliances</li>
                  <li>Keep emergency kit with drinking water, non-perishable food, medicines</li>
                  <li>Follow evacuation orders from local authorities</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Prone Areas</h3>
                <p className="text-gray-800">Assam, Bihar, Uttarakhand, West Bengal, Odisha, Kerala, Maharashtra (coastal districts), Gujarat (Saurashtra)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Regional Helplines</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-gray-100 rounded-lg p-2 shadow-sm">
                    <p className="text-gray-800">Bihar SDRF: 0612-2294204</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 shadow-sm">
                    <p className="text-gray-800">Assam SDRF: 0361-2237011</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 shadow-sm">
                    <p className="text-gray-800">Kerala SDMA: 0471-2331345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Heatwaves */}
          <div className="bx bg-orange-50 rounded-xl p-6 border border-orange-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Thermometer className="w-6 h-6 text-orange-600" />
              Heatwaves
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-2">Alert Signs</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Temperatures exceeding 40°C (104°F) in plains and 30°C (86°F) in hilly regions</li>
                  <li>IMD "Red Alert" warnings</li>
                  <li>Prolonged high temperatures for more than 4-5 days</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-2">Safety Measures</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Stay indoors during peak hours (11am to 3pm)</li>
                  <li>Stay hydrated with water and ORS solutions</li>
                  <li>Wear lightweight, light-colored, loose cotton clothes</li>
                  <li>Cover head when outdoors with hat/umbrella</li>
                  <li>Check on elderly, pregnant women and children regularly</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-2">Prone Areas</h3>
                <p className="text-gray-800">Rajasthan, Vidarbha, Telangana, Andhra Pradesh, Punjab, Haryana, Delhi, Uttar Pradesh, Bihar, Jharkhand</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-700 mb-2">Heat Stroke Symptoms</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>High body temperature (above 103°F/39.4°C)</li>
                  <li>Hot, red, dry skin with no sweating</li>
                  <li>Rapid, strong pulse; throbbing headache</li>
                  <li>Dizziness, nausea, confusion or unconsciousness</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Earthquakes */}
          <div className="bx bg-gray-100 rounded-xl p-6 border border-gray-300 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-gray-600" />
              Earthquakes
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">During Earthquake</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Drop, Cover, Hold: Get under sturdy furniture</li>
                  <li>Stay away from windows, glass, and exterior walls</li>
                  <li>If outdoors, move to open areas away from buildings</li>
                  <li>If in vehicle, pull over away from buildings and utility poles</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">After Earthquake</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Check for injuries and provide first aid</li>
                  <li>Check for structural damage to buildings</li>
                  <li>Turn off gas, water, and electricity if damaged</li>
                  <li>Be prepared for aftershocks</li>
                  <li>Listen to radio for emergency information</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Seismic Zones</h3>
                <p className="text-gray-800"><strong>High Risk (Zone 5):</strong> Entire Himalayan belt, parts of Kashmir, Western and Central Himachal Pradesh, Uttarakhand, Rann of Kutch, parts of North Bihar, Northeast India</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Contacts</h3>
                <p className="text-gray-800">National Centre for Seismology: 011-24611842</p>
                <p className="text-gray-800">Geological Survey of India (GSI): 033-22861693</p>
              </div>
            </div>
          </div>

          {/* Wildfires */}
          <div className=" bx bg-red-50 rounded-xl p-6 border border-red-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-red-600" />
              Wildfires
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Alert Signs</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Smoke or fire visible in forest areas</li>
                  <li>Forest Department warnings during dry seasons</li>
                  <li>Extended dry period with high temperatures</li>
                  <li>Strong winds in fire-prone areas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Safety Measures</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>If near a wildfire, evacuate immediately</li>
                  <li>Cover nose and mouth with wet cloth</li>
                  <li>Follow evacuation routes away from fire direction</li>
                  <li>If trapped, find water body or cleared area</li>
                  <li>Report fires immediately to local forest department</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Prone Areas</h3>
                <p className="text-gray-800">Uttarakhand, Himachal Pradesh, Jammu & Kashmir, Northeast states, Forest areas of Maharashtra, Odisha, Chhattisgarh, Madhya Pradesh</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">Regional Contacts</h3>
                <p className="text-gray-800">Forest Survey of India: 0135-2752872</p>
                <p className="text-gray-800">Uttarakhand Forest Fire Helpline: 1800-180-4111</p>
              </div>
            </div>
          </div>

          {/* Cyclones */}
          <div className="bx bg-teal-50 rounded-xl p-6 border border-teal-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Wind className="w-6 h-6 text-teal-600" />
              Cyclones
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Alert Signs</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>IMD cyclone warnings and alerts</li>
                  <li>Unusually large ocean waves</li>
                  <li>Rapid changes in wind direction and speed</li>
                  <li>Government evacuation notices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Safety Measures</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Evacuate when ordered by authorities</li>
                  <li>Move to designated cyclone shelters</li>
                  <li>Store drinking water and non-perishable food</li>
                  <li>Keep emergency kit ready with medications</li>
                  <li>Secure loose items outside homes</li>
                  <li>Stay indoors during cyclone</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Prone Areas</h3>
                <p className="text-gray-800">Eastern coast (Odisha, West Bengal, Andhra Pradesh, Tamil Nadu), Western coast (Gujarat, Maharashtra, Goa, Karnataka, Kerala)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">Contacts</h3>
                <p className="text-gray-800">IMD Cyclone Warning: 1800-220-161</p>
                <p className="text-gray-800">Odisha Disaster Helpline: 1077/1070</p>
                <p className="text-gray-800">West Bengal Disaster Management: 1070</p>
              </div>
            </div>
          </div>

          {/* Landslides */}
          <div className=" bx bg-amber-50 rounded-xl p-6 border border-amber-200 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-amber-600" />
              Landslides
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">Warning Signs</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Cracks appearing in ground or slopes</li>
                  <li>Water seeping from hillsides</li>
                  <li>Tilting trees, utility poles or walls</li>
                  <li>Unusual sounds like trees cracking or boulders knocking</li>
                  <li>Heavy rainfall in hilly regions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">Safety Measures</h3>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                  <li>Evacuate immediately if signs observed</li>
                  <li>Move away from path of landslide</li>
                  <li>Alert neighbors if possible</li>
                  <li>Watch for flooding which may accompany landslides</li>
                  <li>Listen for unusual sounds that might indicate moving debris</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">Prone Areas</h3>
                <p className="text-gray-800">Himalayan states (Uttarakhand, Himachal Pradesh, Jammu & Kashmir), Northeast states, Western Ghats (Kerala, Karnataka, Tamil Nadu, Goa), Eastern Ghats (parts of Andhra Pradesh)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">Contacts</h3>
                <p className="text-gray-800">Geological Survey of India (Landslide Division): 0135-2740008</p>
                <p className="text-gray-800">Himachal Pradesh Disaster Management: 1077</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Preparedness Kit */}
        <div className=" bx bg-green-50 rounded-xl p-6 mb-8 border border-green-200 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            Emergency Preparedness Kit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bx g-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-green-700 mb-2">Essential Supplies</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>Drinking water (3 days supply, 4L per person per day)</li>
                <li>Non-perishable food items</li>
                <li>First aid kit with essential medications</li>
                <li>Flashlight with extra batteries</li>
                <li>Battery-powered or hand-crank radio</li>
                <li>Whistle to signal for help</li>
                <li>Dust mask, plastic sheeting and duct tape</li>
                <li>Moist towelettes and garbage bags</li>
                <li>Cell phone with chargers and backup battery</li>
              </ul>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-green-700 mb-2">Documents</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>Identification documents (Aadhaar, PAN, passport)</li>
                <li>Insurance policies</li>
                <li>Bank account information</li>
                <li>Cash or traveler's checks</li>
                <li>Emergency contact list</li>
                <li>Map of the area</li>
                <li>Medical prescriptions and records</li>
                <li>Family photos for identification if separated</li>
              </ul>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-green-700 mb-2">Special Needs</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>Prescription medicines (7-day supply)</li>
                <li>Infant formula, diapers, bottles</li>
                <li>Pet food and extra water for pets</li>
                <li>Glasses, contact lenses and solutions</li>
                <li>Activities for children</li>
                <li>Feminine supplies and personal hygiene items</li>
                <li>Assistive devices (hearing aids, mobility aids)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disaster Management Apps */}
        <div className="bx bg-purple-50 rounded-xl p-6 mb-8 border border-purple-200 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-purple-600" />
            Official Disaster Management Apps & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-purple-700 mb-2">NDMA App</h3>
              <p className="text-gray-800">Official National Disaster Management Authority app with early warnings and safety tips</p>
            </div>
            <div className=" bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-purple-700 mb-2">Meghdoot</h3>
              <p className="text-gray-800">Weather forecasting app by IMD providing weather warnings</p>
            </div>
            <div className=" bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-purple-700 mb-2">Damini</h3>
              <p className="text-gray-800">Lightning alert app providing real-time thunderstorm warnings</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-purple-700 mb-2">SACHET</h3>
              <p className="text-gray-800">Early Warning System for cyclones and tsunami alerts</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-purple-700 mb-2">IFLOWS</h3>
              <p className="text-gray-800">Integrated Flood Warning System for urban flood alerts</p>
            </div>
            <div className="bx bg-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-purple-700 mb-2">Official Websites</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>NDMA: ndma.gov.in</li>
                <li>IMD: mausam.imd.gov.in</li>
                <li>Central Water Commission: cwc.gov.in</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Training Resources */}
        <div className="bx bg-blue-50 rounded-xl p-6 border border-blue-200 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            Training & Preparation Resources
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">First Aid Training</h3>
              <p className="text-gray-800">Indian Red Cross Society: www.indianredcross.org</p>
              <p className="text-gray-800">St. John Ambulance India: stjohnambulanceindia.org</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Community Preparedness Programs</h3>
              <p className="text-gray-800">Aapda Mitra Scheme - Volunteer training for disaster response</p>
              <p className="text-gray-800">Contact local District Disaster Management Authority</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Online Resources</h3>
              <p className="text-gray-800">NDMA Training Modules: ndma.gov.in/training</p>
              <p className="text-gray-800">NIDM E-Learning: nidm.gov.in/online_course.asp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};