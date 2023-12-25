import React, { createContext, useState, useContext } from 'react';

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidateData, setCandidateData] = useState(null);

  const setCandidate = (data) => {
    setCandidateData(data);
  };

  return (
    <CandidateContext.Provider value={{ candidateData, setCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidateContext must be used within a CandidateProvider');
  }
  return context;
};
