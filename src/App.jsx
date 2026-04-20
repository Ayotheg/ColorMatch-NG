import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
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
import UserType from './steps/UserType';

function App() {
  return (
    <div className="min-h-screen bg-surface-alt antialiased font-body flex justify-center">
      {/* Desktop Block Message */}
      <div className="hidden lg:flex fixed inset-0 z-[999] bg-surface flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-title font-bold text-primary">Mobile & Tablet Only</h1>
          <p className="text-text-muted text-lg">
            This experience has been exclusively designed for mobile and tablet devices. 
            Please open this application on a smaller screen to continue.
          </p>
        </div>
      </div>

      {/* Main App Container (Visible only on screens smaller than Desktop/lg) */}
      <div className="w-full max-w-2xl min-h-screen bg-bg lg:hidden shadow-2xl relative overflow-x-hidden flex flex-col mx-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Welcome />} />
              <Route path="loading" element={<Loading />} />
              <Route path="results" element={<Results />} />
              <Route path="room-type" element={<RoomType />} />
              <Route path="step1-room" element={<Step1Room />} />
              <Route path="step2-who-is-it" element={<Step2WhoIsIt />} />
              <Route path="step3-color-in-mind" element={<Step3ColorInMind />} />
              <Route path="step4-matching" element={<Step4Matching />} />
              <Route path="step5-paint-type" element={<Step5PaintType />} />
              <Route path="step6-concerns" element={<Step6Concerns />} />
              <Route path="user-type" element={<UserType />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
