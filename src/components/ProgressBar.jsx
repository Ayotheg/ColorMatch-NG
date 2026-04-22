import { useLocation } from "react-router-dom";

// Define the ordered step routes with labels
const STEPS = [
  { path: "/step1-room", label: "Room Type", step: 1 },
  { path: "/step2-who-is-it", label: "User Profile", step: 2 },
  { path: "/step3-color-in-mind", label: "Color Choice", step: 3 },
  { path: "/step4-matching", label: "Color Matching", step: 4 },
  { path: "/step5-paint-type", label: "Paint Finish", step: 5 },
  { path: "/step6-concerns", label: "Specifics", step: 6 },
];

const TOTAL_STEPS = STEPS.length;

// Routes where the progress bar should be completely hidden
const HIDDEN_ROUTES = ["/"];

function ProgressBar() {
  const { pathname } = useLocation();

  // Hide on Welcome page
  if (HIDDEN_ROUTES.includes(pathname)) {
    return null;
  }

  // Find the current step object
  const currentStepObj = STEPS.find((s) => s.path === pathname);
  const currentStep = currentStepObj ? currentStepObj.step : 0;
  const currentLabel = currentStepObj ? currentStepObj.label : "";

  // Don't render on non-step pages (loading, results, etc.)
  if (!currentStepObj) {
    return null;
  }

  return (
    <div className="progress-bar-wrapper">
      {/* Step label */}
      <div className="progress-bar-header">
        <span className="progress-step-indicator">
          Step {currentStep}
          <span className="progress-step-divider">/</span>
          <span className="progress-step-total">{TOTAL_STEPS}</span>
        </span>
        <span className="progress-step-label">{currentLabel}</span>
      </div>

      {/* Segmented bar */}
      <div className="progress-bar-track">
        {STEPS.map((step) => {
          const isCompleted = step.step < currentStep;
          const isActive = step.step === currentStep;

          return (
            <div
              key={step.step}
              className={`progress-bar-segment ${
                isCompleted
                  ? "segment-completed"
                  : isActive
                  ? "segment-active"
                  : "segment-upcoming"
              }`}
            >
              <div
                className="segment-fill"
                style={{
                  width: isCompleted ? "100%" : isActive ? "100%" : "0%",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;