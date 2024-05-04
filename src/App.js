import React, { useState } from 'react';
import InputForm from './InputForm';
import ResultTable from './ResultTable';

function App() {
  const [results, setResults] = useState([]);

  // Function to handle API call and update results state
  const handleVerifyEmails = async (emails) => {
    try {
      const newResults = []; // Temporary array to store new results
      
      for (const email of emails) {
        const response = await fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.REACT_APP_HUNTER_API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        newResults.push(data.data); // Add new data object to temporary array
      }
      
      // Update results state with new results only
      setResults(newResults);
    } catch (error) {
      console.error('Error verifying emails:', error);
    }
  };

   // Function to handle navigation back to input form
   const handleBackToInputForm = () => {
    setResults([]); // Clear the results
  };

  return (
    <div className="App">
      <h1><center>Email Verifier</center></h1>
      {results.length === 0 ? (
        <InputForm onSubmit={handleVerifyEmails} />
      ) : (
        <ResultTable results={results} onBack={handleBackToInputForm} />
      )}
    </div>
  );
}

export default App;