import { createContext, useContext, useState, useCallback } from "react";

const QuizContext = createContext(null);

const initialState = {
  room: "",
  who: "",
  colorInMind: "",
  hasColorInMind: null,
  matching: [],
  matchingColor: "",
  paintType: "",
  concerns: [],
};

export function QuizProvider({ children }) {
  const [quizState, setQuizState] = useState(initialState);

  const setAnswer = useCallback((field, value) => {
    setQuizState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizState(initialState);
  }, []);

  return (
    <QuizContext.Provider value={{ quizState, setAnswer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
