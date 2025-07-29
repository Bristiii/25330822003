import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockApiService } from '../services/mockApi';
import './RedirectHandler.css';

const RedirectHandler = () => {
  const { shortCode } = useParams();
  const [status, setStatus] = useState('loading'); // loading, redirecting, error
  const [error, setError] = useState('');

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        setStatus('loading');
        
        // Make API call to get the long URL and log the click
        const response = await mockApiService.handleRedirect(shortCode);
        
        if (response && response.longUrl) {
          setStatus('redirecting');
          
          // Small delay to show the redirecting message
          setTimeout(() => {
            window.location.href = response.longUrl;
          }, 1000);
        } else {
          throw new Error('Invalid response from server');
        }
        
      } catch (err) {
        console.error('Redirect error:', err);
        setStatus('error');
        
        if (err.response) {
          switch (err.response.status) {
            case 404:
              setError('This short link does not exist or has expired.');
              break;
            case 410:
              setError('This short link has expired.');
              break;
            default:
              setError('An error occurred while processing your request.');
          }
        } else {
          setError('Unable to connect to the server. Please check your internet connection.');
        }
      }
    };

    if (shortCode) {
      handleRedirect();
    } else {
      setStatus('error');
      setError('Invalid short code.');
    }
  }, [shortCode]);

  if (status === 'loading') {
    return (
      <div className="redirect-handler">
        <div className="redirect-content">
          <div className="spinner"></div>
          <h2>Processing your request...</h2>
          <p>Please wait while we retrieve your link.</p>
        </div>
      </div>
    );
  }

  if (status === 'redirecting') {
    return (
      <div className="redirect-handler">
        <div className="redirect-content">
          <div className="success-icon">✅</div>
          <h2>Redirecting...</h2>
          <p>You will be redirected to your destination shortly.</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="redirect-handler">
        <div className="redirect-content error">
          <div className="error-icon">❌</div>
          <h2>Link Not Found</h2>
          <p>{error}</p>
          <div className="error-actions">
            <a href="/" className="home-btn">
              Create a New Link
            </a>
            <button 
              onClick={() => window.history.back()} 
              className="back-btn"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RedirectHandler;