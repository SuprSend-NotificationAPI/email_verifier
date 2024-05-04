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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted

    if (!validateEmails(emails)) {
      alert('Error: Invalid email format');
      setLoading(false); // Reset loading state
      return;
    }

    try {
      await onSubmit(emails.split(',').map(email => email.trim()));
    } catch (error) {
      console.error('Error verifying emails:', error);
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