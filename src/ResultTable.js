// ResultTable.js
import React from 'react';
import './ResultTable.css';

function ResultTable({ results, onBack }) {
  return (
    <div className="result-table">
      <h2>Verification Results</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Result</th>
            <th>Score</th>
            <th>Regexp</th>
            <th>Gibberish</th>
            <th>Disposable</th>
            <th>Webmail</th>
            <th>MX Records</th>
            <th>SMTP Server</th>
            <th>SMTP Check</th>
            <th>Accept All</th>
            <th>Block</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.email}</td>
              <td>{result.status}</td>
              <td>{result.result}</td>
              <td>{result.score}</td>
              <td>{result.regexp ? 'Yes' : 'No'}</td>
              <td>{result.gibberish ? 'Yes' : 'No'}</td>
              <td>{result.disposable ? 'Yes' : 'No'}</td>
              <td>{result.webmail ? 'Yes' : 'No'}</td>
              <td>{result.mx_records ? 'Yes' : 'No'}</td>
              <td>{result.smtp_server ? 'Yes' : 'No'}</td>
              <td>{result.smtp_check ? 'Yes' : 'No'}</td>
              <td>{result.accept_all ? 'Yes' : 'No'}</td>
              <td>{result.block ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onBack}>Back to Input Form</button>
    </div>
  );
}

export default ResultTable;
