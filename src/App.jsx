import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import { NavbarProvider } from './context/NavbarContext';
import Welcome from './screens/Welcome';
import Loading from './screens/Loading';
import Results from './screens/Results';
import RoomType from './steps/RoomType';
import Step1Room from './steps/Step1Room';
import Step2WhoIsIt from './steps/Step2WhoIsIt';
import Step3ColorInMind from './steps/Step3ColorInMind';
import Step4Matching from './steps/Step4Matching';
import Step5PaintType from './steps/Step5PaintType';
import Step6Concerns from './steps/Step6Concerns';
import Exterior from './steps/Exterior';

import { QuizProvider } from './context/QuizContext';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen bg-surface-alt antialiased font-body flex justify-center">
      {/* Desktop Block Message */}
      <div className="hidden xl:flex fixed inset-0 z-[999] bg-surface flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
        <div className="max-w-md space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <h1 className="text-4xl font-title font-bold text-primary">!</h1>
          </div>
          <h1 className="text-4xl font-title font-bold text-primary">Mobile & Tablet Only</h1>
          <p className="text-text-muted text-lg font-body">
            This experience has been exclusively designed for mobile and tablet devices to provide the best possible user experience. 
            Please resize your browser or open this on a smaller device.
          </p>
        </div>
      </div>

      {/* Main App Container */}
      <div className="w-full max-w-2xl xl:max-w-3xl h-screen bg-bg xl:hidden shadow-2xl relative overflow-hidden flex flex-col mx-auto transition-all duration-500">
        <NavbarProvider>
          <QuizProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Welcome />} />
                  <Route path="loading" element={<Loading />} />
                  <Route path="results" element={<Results />} />
                  <Route path="step1-room" element={<Step1Room />} />
                  <Route path="step2-who-is-it" element={<Step2WhoIsIt />} />
                  <Route path="step3-color-in-mind" element={<Step3ColorInMind />} />
                  <Route path="step4-matching" element={<Step4Matching />} />
                  <Route path="step5-paint-type" element={<Step5PaintType />} />
                  <Route path="step6-concerns" element={<Step6Concerns />} />
                  <Route path="exterior" element={<Exterior />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </QuizProvider>
        </NavbarProvider>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
