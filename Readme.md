# ResilienceAI - Predictive Disaster Response System

A sophisticated AI-powered platform for disaster prediction and emergency response coordination. Built with React and Python backend.

## Features

- **AI-Powered Analysis**: Advanced machine learning models for predictive analysis and risk assessment
- **Real-time Monitoring**: Continuous tracking of environmental conditions and critical parameters
- **Multi-Disaster Support**: Currently supports prediction for:
  - Heatwaves
  - Floods
- **Interactive Dashboard**: Real-time visualization of weather data and predictions
- **Emergency Response Coordination**: Streamlined resource management during disasters

## Tech Stack

- **Frontend**:
  - React 19.0
  - Tailwind CSS
  - Chart.js/Recharts for visualizations
  - Leaflet for maps
  - React Router for navigation

- **Backend**:
  - Python
  - Machine Learning models
  - Flask API

## Getting Started

1. **Clone the repository**
```sh
git clone [repository-url]
cd ResilienceAI
```

2. **Install dependencies**
```sh
npm install
```

3. **Start development server**
```sh
npm run dev
```

4. **Build for production**
```sh
npm run build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_AMBEE_API_KEY=your_ambee_api_key
VITE_OPENWEATHER_KEY=your_openweather_key
```

## Project Structure

```
├── backend/
│   ├── app.py
│   ├── disaster_monitor.log
│   ├── disaster-monitor.py
│   ├── flood_prediction_model.pkl
│   └── heatwave_model.pkl
├── src/
│   ├── components/
│   ├── pages/
│   ├── models/
│   ├── styles/
│   └── App.tsx
└── public/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Development Team:
  - Anant Gobade - Backend Developer
  - Ayush Bhusari - Frontend Developer
  - Srujan Deshmukh - Android Developer