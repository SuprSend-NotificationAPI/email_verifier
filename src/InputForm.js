import React, { useState } from 'react';
import './InputForm.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

function InputForm({ onSubmit }) {
  const [emails, setEmails] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmails = (emails) => {
    const emailArray = emails.split(',').map(email => email.trim());
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailArray.every(email => emailFormat.test(email));
  };

  const handleVerifyEmails = async (emails) => {
    const newResults = []; // Temporary array to store new results

    for (const email of emails) {
      const response = await fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.REACT_APP_HUNTER_API_KEY}`);
      
      if (!response.ok) {
        const errorMessage = await response.json();
        if (errorMessage.errors && errorMessage.errors[0].id === 'too_many_requests') {
          throw new Error('API rate limit reached. Please try again tomorrow.');
        } else {
          throw new Error('Network response was not ok');
        }
      }

      const data = await response.json();
      newResults.push(data.data); // Add new data object to temporary array
    }
    
    return newResults;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted

    if (!validateEmails(emails)) {
      alert('Error: Invalid email format');
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const results = await handleVerifyEmails(emails.split(',').map(email => email.trim()));
      onSubmit(results);
    } catch (error) {
      console.error('Error verifying emails:', error);
      alert(error.message); // Display error message to user
    } finally {
      setLoading(false); // Reset loading state after form submission
    }
  };

  return (   
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: 20, marginBottom: '10px' }}>
          Enter Email(s) [separated with comma]:
        </label>
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          required
          rows={4} // Adjust the number of visible rows as needed
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner">
              <i className="fa fa-spinner fa-spin"></i> {/* Font Awesome spinner icon */}
            </div>
          ) : (
            'Verify'
          )}
        </button>
      </form>
    </div>
  );
}

export default InputForm;
