import React, { useState, useEffect } from 'react';
import { mockApiService } from '../services/mockApi';
import './StatsPage.css';

const StatsPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUrl, setExpandedUrl] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await mockApiService.getStats();
      setUrls(response);
      setError(null);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load statistics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (urlId) => {
    setExpandedUrl(expandedUrl === urlId ? null : urlId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getLocationString = (location) => {
    if (!location) return 'Unknown';
    const parts = [];
    if (location.city) parts.push(location.city);
    if (location.country) parts.push(location.country);
    return parts.length > 0 ? parts.join(', ') : 'Unknown';
  };

  const getReferrerDisplay = (referrer) => {
    if (!referrer || referrer === 'direct') return 'Direct';
    try {
      const url = new URL(referrer);
      return url.hostname;
    } catch {
      return referrer;
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (loading) {
    return (
      <div className="stats-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-page">
        <div className="container">
          <div className="error">
            <h2>❌ Error</h2>
            <p>{error}</p>
            <button onClick={fetchStats} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-page">
      <div className="container">
        <div className="header">
          <h1>URL Statistics Dashboard</h1>
          <p>Track the performance of your shortened URLs</p>
          <button onClick={fetchStats} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        {urls.length === 0 ? (
          <div className="empty-state">
            <h3>No URLs found</h3>
            <p>You haven't created any shortened URLs yet.</p>
            <a href="/" className="create-link-btn">Create Your First Link</a>
          </div>
        ) : (
          <div className="urls-list">
            {urls.map((url) => (
              <div key={url.id} className="url-card">
                <div className="url-header">
                  <div className="url-info">
                    <div className="short-url">
                      <span>{url.shortUrl}</span>
                      <button 
                        onClick={() => copyToClipboard(url.shortUrl)}
                        className="copy-btn-small"
                      >
                        📋
                      </button>
                    </div>
                    <div className="url-meta">
                      <span className="created">Created: {formatDate(url.createdAt)}</span>
                      <span className="expires">
                        Expires: {url.expiryDate ? formatDate(url.expiryDate) : 'Never'}
                      </span>
                    </div>
                  </div>
                  <div className="click-count">
                    <span className="count">{url.clickCount}</span>
                    <span className="label">Clicks</span>
                  </div>
                </div>

                {url.clicks && url.clicks.length > 0 && (
                  <div className="clicks-section">
                    <button 
                      onClick={() => toggleExpanded(url.id)}
                      className="toggle-clicks-btn"
                    >
                      {expandedUrl === url.id ? '▼' : '▶'} 
                      View Click Details ({url.clicks.length})
                    </button>

                    {expandedUrl === url.id && (
                      <div className="clicks-details">
                        <div className="clicks-header">
                          <span>Timestamp</span>
                          <span>Source</span>
                          <span>Location</span>
                        </div>
                        <div className="clicks-list">
                          {url.clicks.map((click, index) => (
                            <div key={index} className="click-item">
                              <span className="timestamp">
                                {formatDate(click.timestamp)}
                              </span>
                              <span className="referrer">
                                {getReferrerDisplay(click.referrer)}
                              </span>
                              <span className="location">
                                {getLocationString(click.location)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(!url.clicks || url.clicks.length === 0) && (
                  <div className="no-clicks">
                    <p>No clicks yet. Share your link to start tracking!</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPage;