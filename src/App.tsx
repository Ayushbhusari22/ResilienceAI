import { Routes, Route } from 'react-router-dom';

//pages
import HomePage from './pages/HomePage';
import Prediction from './pages/Prediction';
import PredictionResults from './pages/PredictionResults';
import HeatwavePrediction from './pages/HeatwavePrediction';
import HeatwaveResult from './pages/HeatwaveResult';
import FloodPrediction from './pages/FloodPrediction';
import FloodResult from './pages/FloodResult';
import LearnMore from './pages/LearnMore';
import ResponseCoordination from './pages/ResponseCoordination';
// import ResponseCoordinationLogin from './pages/ResponseCoordinationLogin';
import CreateAccount from './pages/CreateAccount';
// import PopulationSafety from './pages/PopulationSafety';
// import PopulationSafetyResults from './pages/PopulationSafetyResults';
// // import AuthGuard from './components/AuthGuard';
// import GeospatialAnalysis from './pages/GeospatialAnalysis';
// import GeospatialResults from './pages/GeospatialResults';
// import DataAnalytics from './pages/DataAnalytics'
// import DataAnalyticsResults from './pages/DataAnalyticsResults';
import DarkVeil from './theme/DarkVeil';
import './App.css';

function App() {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {/* DarkVeil behind everything */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <DarkVeil />
            </div>
            {/* Content above the DarkVeil */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/prediction" element={<Prediction />} />
                    <Route path="/prediction/results" element={<PredictionResults />} />
                    <Route path="/response-coordination" element={<ResponseCoordination />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/heatwave-prediction" element={<HeatwavePrediction />} />
                    <Route path="/heatwave-result" element={<HeatwaveResult />} />
                    <Route path="/flood-prediction" element={<FloodPrediction />} />
                    <Route path="/flood-result" element={<FloodResult />} />
                    <Route path="/learn-more/:featureId" element={<LearnMore />} />
                    {/* <Route path="/geospatial-analysis" element={<GeospatialAnalysis />} />
                    <Route path="/geospatial-analysis/:country/:city" element={<GeospatialResults />} />
                    <Route path="/data-analytics" element={<FloodPrediction />} />
                    <Route path="/data-analytics/results" element={<FloodResult />} /> */}
                    <Route path="/response-coordination/dashboard" />
                </Routes>
            </div>
        </div>
    );
}

export default App;
