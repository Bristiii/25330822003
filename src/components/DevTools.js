import React from 'react';
import { mockApiService } from '../services/mockApi';
import './DevTools.css';

const DevTools = () => {
  const handleSeedData = async () => {
    try {
      await mockApiService.seedSampleData();
      alert('Sample data seeded successfully! Check the Stats page.');
      window.location.reload();
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Error seeding data. Check console for details.');
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      mockApiService.clearAllData();
      alert('All data cleared successfully!');
      window.location.reload();
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="dev-tools">
      <div className="dev-tools-content">
        <h4>🛠️ Development Tools</h4>
        <div className="dev-tools-buttons">
          <button onClick={handleSeedData} className="dev-btn seed-btn">
            Seed Sample Data
          </button>
          <button onClick={handleClearData} className="dev-btn clear-btn">
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevTools;