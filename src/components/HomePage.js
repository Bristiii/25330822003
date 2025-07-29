import React, { useState } from 'react';
import { mockApiService } from '../services/mockApi';
import './HomePage.css';

const HomePage = () => {
  const [formData, setFormData] = useState({
    longUrl: '',
    customShortcode: '',
    expiryMinutes: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateUrl = (url) => {
    const urlPattern = /^https?:\/\/.+/;
    return urlPattern.test(url);
  };

  const validateShortcode = (shortcode) => {
    if (!shortcode) return true; // Optional field
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    return alphanumericPattern.test(shortcode);
  };

  const validateExpiry = (expiry) => {
    if (!expiry) return true; // Optional field
    const num = parseInt(expiry);
    return !isNaN(num) && num > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.longUrl.trim()) {
      newErrors.longUrl = 'URL is required';
    } else if (!validateUrl(formData.longUrl)) {
      newErrors.longUrl = 'Please enter a valid URL (must start with http:// or https://)';
    }

    if (formData.customShortcode && !validateShortcode(formData.customShortcode)) {
      newErrors.customShortcode = 'Custom shortcode must contain only letters and numbers';
    }

    if (formData.expiryMinutes && !validateExpiry(formData.expiryMinutes)) {
      newErrors.expiryMinutes = 'Expiry must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Prepare the request data
      const requestData = {
        longUrl: formData.longUrl.trim(),
        ...(formData.customShortcode && { customShortcode: formData.customShortcode.trim() }),
        ...(formData.expiryMinutes && { expiryMinutes: parseInt(formData.expiryMinutes) })
      };

      // Make API call to backend
      const response = await mockApiService.shortenUrl(requestData);
      
      setResult({
        shortUrl: response.shortUrl,
        expiryDate: response.expiryDate,
        success: true
      });

      // Clear form
      setFormData({
        longUrl: '',
        customShortcode: '',
        expiryMinutes: ''
      });

    } catch (error) {
      console.error('Error shortening URL:', error);
      
      if (error.response && error.response.data && error.response.data.message) {
        setResult({
          message: error.response.data.message,
          success: false
        });
      } else {
        setResult({
          message: 'An error occurred while shortening the URL. Please try again.',
          success: false
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="header">
          <h1>URL Shortener</h1>
          <p>Transform your long URLs into short, shareable links</p>
        </div>

        <form onSubmit={handleSubmit} className="shortener-form">
          <div className="form-group">
            <label htmlFor="longUrl">Long URL *</label>
            <input
              type="text"
              id="longUrl"
              name="longUrl"
              value={formData.longUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/very/long/url"
              className={errors.longUrl ? 'error' : ''}
            />
            {errors.longUrl && <span className="error-message">{errors.longUrl}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customShortcode">Custom Shortcode (Optional)</label>
            <input
              type="text"
              id="customShortcode"
              name="customShortcode"
              value={formData.customShortcode}
              onChange={handleInputChange}
              placeholder="MyCoolLink"
              className={errors.customShortcode ? 'error' : ''}
            />
            {errors.customShortcode && <span className="error-message">{errors.customShortcode}</span>}
            <small className="help-text">Letters and numbers only</small>
          </div>

          <div className="form-group">
            <label htmlFor="expiryMinutes">Expiry Time (Minutes, Optional)</label>
            <input
              type="number"
              id="expiryMinutes"
              name="expiryMinutes"
              value={formData.expiryMinutes}
              onChange={handleInputChange}
              placeholder="60"
              min="1"
              className={errors.expiryMinutes ? 'error' : ''}
            />
            {errors.expiryMinutes && <span className="error-message">{errors.expiryMinutes}</span>}
            <small className="help-text">Leave empty for default expiry</small>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {result && (
          <div className={`result ${result.success ? 'success' : 'error'}`}>
            {result.success ? (
              <div className="success-result">
                <h3>✅ URL Shortened Successfully!</h3>
                <div className="result-item">
                  <label>Short URL:</label>
                  <div className="url-display">
                    <span>{result.shortUrl}</span>
                    <button 
                      onClick={() => copyToClipboard(result.shortUrl)}
                      className="copy-btn"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                {result.expiryDate && (
                  <div className="result-item">
                    <label>Expires:</label>
                    <span>{new Date(result.expiryDate).toLocaleString()}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="error-result">
                <h3>❌ Error</h3>
                <p>{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;